{}
import a from "b";
export { a };
<style/>
<!DOCTYPE html>
<html>
  <head>
    <title>
      Title of the document
    </title>
  </head>
  <body>
    The content of the document......
  </body>
</html>
<style>
  div { color:
  ${x}
  ; }
</style>
<script>
  var y =
  ${x}
  ;
</script>
doThings();
andStuff();

function more() {
  abc();
}

<macro(stuff) name="thing">
  <div x=stuff.x/>
</macro>
$ var b = thing;

$ let c = thing;

<div b=b c=c>
  $ var d = thing;

  $ let e = thing;

  $ {
    crazy();
    stuff();
  }
  <div d=d e=e/>
</div>
<div on-click("handleClick", a, b, ...d)/>
<div id:scoped="1"/>
<div class=["a", {
  b: c,
  d
}] style={
  a: "b"
}/>
<input type="text"/>
<${a} key="x">
  <div/>
</>
<thing x=1/>
<other(a) on-click("handleClick", a, b, ...d)>
  <div/>
</other>
<other(b) x=1 ...thing b={
  a: 1
} ...c ...(d || e)>
  <div/>
  <@c c=1>
    <div/>
    <@d d=1>
      <div/>
    </@d>
  </@c>
</other>
<div id="a" class="b c" a={
  a: 1
} c="${d}" ...e>
  ${a}
  <!--123-->
  <html-comment>
    abc
  </html-comment>
  <div c=1/>
  <div d=1/>
  <if if=(x === a)>
    a
    ${b}
  </if>
  <else if=(x === 2)>
    b
  </else>
  <else>
    c
  </else>
</div>
<div b=1/>
<div>
  123 abc 123
</div>
<span ...abc/>
<if if=cond>
  Hello
  ${planet}
</if>
<for(i) from=0 to=10 step=2>
  <div c=1/>
</for>
<for(key, val) in=obj>
  <div c=1/>
</for>
<for(val, i) of=arr>
  $ i;

  <key key=val.name>
    <div c=1/>
    <other d=2/>
  </key>
</for>
<div body-only-if>
  Hi
</div>