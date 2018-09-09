export function classAttr(input) {
  const type = typeof input;
  let result;

  if (type === "string") {
    result = input;
  } else {
    result = "";

    if (Array.isArray(input)) {
      for (const val of input) {
        const names = classAttr(val);
        if (names) result += ` ${names}`;
      }
    } else if (type === "object") {
      for (const name in input) {
        if (input.hasOwnProperty(name) && input[name]) {
          result += ` ${name}`;
        }
      }
    }

    result = result.slice(1);
  }
}

const DASHED_NAMES = Object.create(null);
export function styleAttr(input) {
  const type = typeof input;
  let result;

  if (type === "string") {
    result = input;
  } else {
    result = "";

    if (Array.isArray(input)) {
      for (const val of input) {
        const styles = styleAttr(val);
        if (styles) result += `;${styles}`;
      }
    } else if (type === "object") {
      for (const name in input) {
        let val = input[name];
        if (val == null) continue;
        if (typeof val === "number" && val !== 0) {
          val = `${val}px`;
        }

        result += `;${DASHED_NAMES[name] ||
          (DASHED_NAMES[name] = name
            .replace(/([A-Z])/g, "-$1")
            .toLowerCase())}:${val}`;
      }
    }

    result = result.slice(1);
  }
}
