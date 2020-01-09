import { types as t } from "@marko/babel-types";
import { normalizeTemplateString, isTransparentTag } from "@marko/babel-utils";
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
    if (isTransparentTag(path)) {
      return;
    }

    const userKey = getUserKey(path);
    if (userKey) {
      const parentTag = path.parentPath.parentPath;
      if (isLoopTag(parentTag) && !getLoopKey(parentTag)) {
        const keyIdentifier = path.scope.generateUidIdentifier("loopKey");
        path.set("key", keyIdentifier);
        path.insertBefore(
          t.variableDeclaration("const", [
            t.variableDeclarator(keyIdentifier, userKey)
          ])
        );

        parentTag.set("loopKey", keyIdentifier);
      }
    } else {
      const parentLoopKeys = getParentLoopKeys(path);
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
    .filter(isLoopTag)
    .map(getLoopKey)
    .filter(Boolean)
    .reverse();
}

function getLoopKey(path) {
  return path.get("loopKey").node;
}

function getUserKey(path) {
  let key = path.get("key").node;
  if (key === undefined) {
    const keyAttr = path
      .get("attributes")
      .find(attr => attr.get("name").node === "key");

    if (keyAttr) {
      key = normalizeTemplateString`@${keyAttr.get("value").node}`;
      keyAttr.remove();
    } else {
      key = null;
    }

    path.set("key", key);
  }

  return key;
}

function isLoopTag(path) {
  if (!path.isMarkoTag()) {
    return false;
  }

  const tagName = path.node.name.value;
  return tagName === "while" || tagName === "for";
}
