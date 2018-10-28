{}
<macro(node) name="renderTree">
  Name:
  ${node.name}
  Children:
  <if if=node.children>
    <ul>
      <for(child) of=node.children>
        <li>
          <renderTree ...child/>
        </li>
      </for>
    </ul>
  </if>
</macro>
<renderTree ...input.node/>