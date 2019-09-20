import { types as t } from "@marko/babel-types";
import { normalizeTemplateString } from "@marko/babel-utils";
const KeyManagerLookup = new WeakMap();

/**
 * @returns {KeyManager}
 */
export function getKeyManager(path) {
  const { hub } = path;
  return (
    KeyManagerLookup.get(hub) ||
    KeyManagerLookup.set(hub, new KeyManager()).get(hub)
  );
}

class KeyManager {
  constructor() {
    this._nextKey = 0;
  }

  nextKey() {
    return Object.assign(t.stringLiteral(String(this._nextKey++)), {
      _autoKey: true
    });
  }

  resolveKey(path) {
    const parentLoopKeys = getParentLoopKeys(path);
    if (!hasUserDefinedKey(path)) {
      const autoKey = path.get("key").node || this.nextKey();
      path.set(
        "key",
        parentLoopKeys.length
          ? normalizeTemplateString`${autoKey}${normalizeTemplateString(
              ["[", ...parentLoopKeys.slice(1).map(() => "]["), "]"],
              ...parentLoopKeys
            )}`
          : autoKey
      );
    }
  }
}

function getParentLoopKeys(path) {
  return path
    .getAncestry()
    .filter(parent => {
      if (parent.isMarkoTag()) {
        const tagName = parent.get("name.value").node;
        if (tagName === "for" || tagName === "while") {
          return true;
        }
      }
    })
    .map(getLoopKey)
    .filter(Boolean)
    .reverse();
}

function getLoopKey(path) {
  if (path.get("checkedKey").node) {
    const existingIdentifier = path.get("loopKey").node;
    return existingIdentifier && t.identifier(existingIdentifier.name);
  }

  const loopBody = path.get("body.body");
  const childElements = loopBody.filter(childPath => childPath.isMarkoTag());
  const [firstElement] = childElements;
  const allKeyed = childElements.every(hasUserDefinedKey);
  path.set("checkedKey", true);

  if (allKeyed || !hasUserDefinedKey(firstElement)) {
    return;
  }

  const firstElementKey = firstElement.get("key").node;
  const keyIdentifier = path.scope.generateUidIdentifier("loopKey");
  firstElement.set("key", keyIdentifier);
  firstElement.insertBefore(
    t.variableDeclaration("const", [
      t.variableDeclarator(keyIdentifier, firstElementKey)
    ])
  );

  path.set("loopKey", keyIdentifier);

  return keyIdentifier;
}

function hasUserDefinedKey(path) {
  const key = path.get("key").node;
  return key && !key._autoKey;
}
