import type { JSDOM } from "jsdom";
import format, { plugins } from "pretty-format";
import { getNodePath } from "./get-node-info";

const { DOMElement, DOMCollection } = plugins;

export default function createMutationTracker(
  window: JSDOM["window"],
  container: ParentNode
) {
  const result: string[] = [];
  let currentRecords: MutationRecord[] | null = null;
  const observer = new window.MutationObserver((records) => {
    if (currentRecords) {
      currentRecords = currentRecords.concat(records);
    } else {
      result.push(getStatusString(container, records, "ASYNC"));
    }
  });
  observer.observe(container, {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true,
  });
  return {
    beginUpdate() {
      currentRecords = [];
    },
    dropUpdate() {
      observer.takeRecords();
      currentRecords = null;
    },
    getUpdate(update: unknown) {
      if (currentRecords) {
        currentRecords = currentRecords.concat(observer.takeRecords());
      } else {
        currentRecords = observer.takeRecords();
      }
      const updateString = getStatusString(container, currentRecords, update);
      currentRecords = null;
      return updateString;
    },
    log(message: string) {
      result.push(message);
    },
    logUpdate(update: unknown) {
      result.push(this.getUpdate(update));
    },
    getRawLogs() {
      return result;
    },
    getLogs() {
      return result.join("\n\n\n");
    },
    cleanup() {
      observer.disconnect();
    },
  };
}

function getStatusString(
  container: ParentNode,
  records: MutationRecord[],
  update: unknown
) {
  const clone = container.cloneNode(true);
  clone.normalize();

  return `# Render ${
    typeof update === "function"
      ? `\n${update
          .toString()
          .replace(/^.*?{\s*([\s\S]*?)\s*}.*?$/, "$1")
          .replace(/^ {4}/gm, "")}\n`
      : JSON.stringify(update)
  }\n\`\`\`html\n${Array.from(clone.childNodes)
    .map((child) =>
      format(child, {
        plugins: [DOMElement, DOMCollection],
      }).trim()
    )
    .filter(Boolean)
    .join("\n")
    .trim()}\n\`\`\`\n\n# Mutations\n\`\`\`\n${records
    .map(formatMutationRecord)
    .filter(Boolean)
    .join("\n")}\n\`\`\``;
}

function formatMutationRecord(record: MutationRecord) {
  const { target, oldValue } = record;

  switch (record.type) {
    case "attributes": {
      const { attributeName } = record;
      const newValue = (target as HTMLElement).getAttribute(
        attributeName as string
      );
      return `${getNodePath(target)}: attr(${attributeName}) ${JSON.stringify(
        oldValue
      )} => ${JSON.stringify(newValue)}`;
    }

    case "characterData": {
      const newValue = target.nodeValue;

      // if the new value begins with the old value
      // and whitespace delimits the old value and remaining new value
      if (
        newValue?.indexOf(oldValue!) === 0 &&
        (/\s$/ms.test(oldValue!) || /\s$/ms.test(newValue![oldValue!.length]))
      ) {
        // filter out invalid records that jsdom creates
        // see https://github.com/jsdom/jsdom/issues/3261
        // TODO: remove if fixed
        return;
      }

      return `${getNodePath(target)}: ${JSON.stringify(
        oldValue || ""
      )} => ${JSON.stringify(target.nodeValue || "")}`;
    }

    case "childList": {
      const { removedNodes, addedNodes, previousSibling, nextSibling } = record;
      const details: string[] = [];
      if (removedNodes.length) {
        const relativeNode = previousSibling || nextSibling || target;
        const position =
          relativeNode === previousSibling
            ? "after"
            : relativeNode === nextSibling
            ? "before"
            : "in";
        details.push(
          `removed ${Array.from(removedNodes)
            .map(getNodePath)
            .join(", ")} ${position} ${getNodePath(relativeNode)}`
        );
      }

      if (addedNodes.length) {
        details.push(
          `inserted ${Array.from(addedNodes).map(getNodePath).join(", ")}`
        );
      }

      return details.join("\n");
    }
  }
}
