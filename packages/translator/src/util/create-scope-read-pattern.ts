import { types as t } from "@marko/compiler";
import type { References } from "./references";
import type { Section } from "./sections";
import { getScopeAccessorLiteral, repeatableReserves } from "./reserve";

export function createScopeReadPattern(
  section: Section,
  references: References
) {
  const rootDepth = section.depth;
  const rootPattern = t.objectPattern([]);
  let nestedPatterns: t.ObjectPattern[] | undefined;
  for (const ref of repeatableReserves.iterate(references)) {
    const propertyKey = getScopeAccessorLiteral(ref);
    const propertyValue = t.identifier(ref.name);
    const isShorthand = propertyKey.value === propertyValue.name;
    let pattern: t.ObjectPattern = rootPattern;
    if (ref.section !== section) {
      if (!nestedPatterns) nestedPatterns = [rootPattern];

      const relativeDepth = rootDepth - ref.section.depth;
      let i = nestedPatterns.length;
      let prev = nestedPatterns[i - 1];
      for (; i <= relativeDepth; i++) {
        const nestedPattern = t.objectPattern([]);
        prev.properties.push(
          t.objectProperty(t.identifier("_"), nestedPattern)
        );
        nestedPatterns.push(nestedPattern);
        prev = nestedPattern;
      }

      pattern = nestedPatterns[relativeDepth];
    }

    pattern.properties.push(
      t.objectProperty(
        isShorthand ? propertyValue : propertyKey,
        propertyValue,
        false,
        isShorthand
      )
    );
  }

  return rootPattern;
}
