# Render {}
```html
<html>
  <head />
  <body>
    <!--M^1-->
    <div>
      <button
        id="count"
      >
        0
        <!--M#2 #text/1-->
      </button>
      <!--M#2 #button/0-->
    </div>
    <!--M/0 #text/0-->
    <button
      id="changeTag"
    />
    <!--M#0 #button/1-->
    <script>
      (M$h=[]).push((b,s,h)=&gt;({0:{tagName:"div","#text/0!":h={},"#text/0(":"div"},1:h,2:{count:0}}),[2,"packages/translator/src/__tests__/fixtures/dynamic-tag-with-updating-body/components/counter.marko_0_count",0,"packages/translator/src/__tests__/fixtures/dynamic-tag-with-updating-body/template.marko_0_tagName",])
    </script>
  </body>
</html>
```

# Mutations
```
removed #document/html0/body1/#comment0 before #document/html0
inserted #document/html0/body1/#comment0
```


# Render 
container.querySelector("#count").click()

```html
<html>
  <head />
  <body>
    <!--M^1-->
    <div>
      <button
        id="count"
      >
        1
        <!--M#2 #text/1-->
      </button>
      <!--M#2 #button/0-->
    </div>
    <!--M/0 #text/0-->
    <button
      id="changeTag"
    />
    <!--M#0 #button/1-->
    <script>
      (M$h=[]).push((b,s,h)=&gt;({0:{tagName:"div","#text/0!":h={},"#text/0(":"div"},1:h,2:{count:0}}),[2,"packages/translator/src/__tests__/fixtures/dynamic-tag-with-updating-body/components/counter.marko_0_count",0,"packages/translator/src/__tests__/fixtures/dynamic-tag-with-updating-body/template.marko_0_tagName",])
    </script>
  </body>
</html>
```

# Mutations
```
#document/html0/body1/div1/button0/#text0: "0" => "1"
```


# Render 
container.querySelector("#changeTag").click()

```html
<html>
  <head />
  <body>
    <span>
      <button
        id="count"
      >
        0
      </button>
    </span>
    <!--M/0 #text/0-->
    <button
      id="changeTag"
    />
    <!--M#0 #button/1-->
    <script>
      (M$h=[]).push((b,s,h)=&gt;({0:{tagName:"div","#text/0!":h={},"#text/0(":"div"},1:h,2:{count:0}}),[2,"packages/translator/src/__tests__/fixtures/dynamic-tag-with-updating-body/components/counter.marko_0_count",0,"packages/translator/src/__tests__/fixtures/dynamic-tag-with-updating-body/template.marko_0_tagName",])
    </script>
  </body>
</html>
```

# Mutations
```
inserted #document/html0/body1/span0
removed #comment after #document/html0/body1/span0
removed div after #document/html0/body1/span0
inserted #document/html0/body1/span0/button0
```


# Render 
container.querySelector("#count").click()

```html
<html>
  <head />
  <body>
    <span>
      <button
        id="count"
      >
        1
      </button>
    </span>
    <!--M/0 #text/0-->
    <button
      id="changeTag"
    />
    <!--M#0 #button/1-->
    <script>
      (M$h=[]).push((b,s,h)=&gt;({0:{tagName:"div","#text/0!":h={},"#text/0(":"div"},1:h,2:{count:0}}),[2,"packages/translator/src/__tests__/fixtures/dynamic-tag-with-updating-body/components/counter.marko_0_count",0,"packages/translator/src/__tests__/fixtures/dynamic-tag-with-updating-body/template.marko_0_tagName",])
    </script>
  </body>
</html>
```

# Mutations
```
#document/html0/body1/span0/button0/#text0: "0" => "1"
```