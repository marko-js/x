import {
  write,
  markHydrateNode,
  nextScopeId,
  writeHydrateScope,
  writeHydrateCall,
  register,
  SYMBOL_OWNER,
  markHydrateControlEnd,
  markHydrateScopeStart,
} from "@marko/runtime-fluurt/src/html";

export default () => {
  write("<body>");
  counter();
  write("</body>");
};

// <let/show = true/>
// <let/count = 0/>
// <button.inc onclick() { count++; }/>
// <button.toggle onclick() { show = !show; }/>
// <if=show>The count is ${count}</if>

const counter = () => {
  const show = true;
  const count = 0;
  const scopeId = nextScopeId();
  let childScope;
  let childRenderer;

  write(
    `${markHydrateNode(
      scopeId,
      0
    )}<button class="inc"></button>${markHydrateNode(
      scopeId,
      1
    )}<button class="toggle"></button>`
  );

  if (show) {
    const childScopeId = nextScopeId();
    write(
      `${markHydrateScopeStart(childScopeId)}The count is ${markHydrateNode(
        childScopeId,
        0
      )}${count}`
    );
    childRenderer = register(() => {}, "ifBody");
    writeHydrateScope(childScopeId, (childScope = { [SYMBOL_OWNER]: scopeId }));
  }
  write(`${markHydrateControlEnd(scopeId, 2)}`);

  // eslint-disable-next-line no-sparse-arrays
  writeHydrateScope(scopeId, {
    [2 + 1]: childScope,
    [2 + 2]: childRenderer,
    8: show,
    9: count,
  });
  writeHydrateCall(scopeId, "counter");
};