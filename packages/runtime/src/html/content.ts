export function toString(val: unknown) {
  return val == null ? "" : val + "";
}

export const escapeXML = escapeIfNeeded((s) => {
  const t = typeof s;
  const delim = "<";
  const escDelim = "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");

  if (iDelim < 0 && iAmp < 0) return s;

  let left = 0,
    out = "";

  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }

  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else
    while (iAmp >= 0) {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }

  return left < s.length ? out + s.substring(left) : out;
})

// export const escapeXML = escapeIfNeeded((val: string) => {
//   let result = "";
//   let lastPos = 0;

//   for (let i = 0, len = val.length; i < len; i++) {
//     let replacement: string;

//     switch (val.charAt(i)) {
//       case "<":
//         replacement = "&lt;";
//         break;
//       case "&":
//         replacement = "&amp;";
//         break;
//       default:
//         continue;
//     }

//     result += val.slice(lastPos, i) + replacement;
//     lastPos = i + 1;
//   }

//   if (lastPos) {
//     return result + val.slice(lastPos);
//   }

//   return val;
// });

export const escapeScript = escapeIfNeeded(escapeTagEnding("script"));
export const escapeStyle = escapeIfNeeded(escapeTagEnding("style"));
function escapeTagEnding(tagName: string) {
  const openTag = `</${tagName}`;
  const escaped = `<\\/${tagName}`;

  return (val: string) => {
    let result = "";
    let lastPos = 0;
    let i = val.indexOf(openTag, lastPos);

    while (i !== -1) {
      result += val.slice(lastPos, i) + escaped;
      lastPos = i + 1;
      i = val.indexOf(openTag, lastPos);
    }

    if (lastPos) {
      return result + val.slice(lastPos);
    }

    return val;
  };
}

export function escapeAttrValue(s) {
  const t = typeof s;
  if (t !== "string") {
    if (t === "boolean") return String(s);
    return s;
  }
  const delim = '"';
  const escDelim = "&quot;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");

  if (iDelim < 0 && iAmp < 0) return s;

  let left = 0,
    out = "";

  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }

  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else
    while (iAmp >= 0) {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }

  return left < s.length ? out + s.substring(left) : out;
}

// export function escapeAttrValue(val: string) {
//   for (let i = 0; i < val.length; i++) {
//     switch (val.charAt(i)) {
//       case '"':
//         return quoteValue(val, i + 1, "'", "&#39;");
//       case "'":
//       case ">":
//       case " ":
//       case "\t":
//       case "\n":
//       case "\r":
//       case "\f":
//         return quoteValue(val, i + 1, '"', "&#34;");
//       default:
//         i++;
//         break;
//     }
//   }

//   return val;
// }

function escapeIfNeeded(escape: (val: string) => string) {
  return (val: unknown) => {
    if (val == null) {
      return "";
    }

    switch (typeof val) {
      case "string":
        return escape(val);
      case "boolean":
      case "number":
        return val + "";
      default:
        return escape(val + "");
    }
  };
}

function quoteValue(
  val: string,
  startPos: number,
  quote: string,
  escaped: string
) {
  let result = quote;
  let lastPos = 0;

  for (let i = startPos, len = val.length; i < len; i++) {
    if (val.charAt(i) === quote) {
      result += val.slice(lastPos, i) + escaped;
      lastPos = i + 1;
    }
  }

  return result + (lastPos ? val.slice(lastPos) : val) + quote;
}
