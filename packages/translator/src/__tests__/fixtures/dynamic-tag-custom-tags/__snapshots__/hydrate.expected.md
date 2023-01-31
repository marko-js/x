# Render {}
```html
<html>
  <head />
  <body>
    <!--M^1-->
    <div>
      Child 1 has 
      <!---->
      3
      <!--M#1 #text/0-->
    </div>
    <!--M/0 #text/0-->
    <button />
    <!--M#0 #button/1-->
    <script>
      (M$h=[]).push((b,s,h)=&gt;({0:{tagName:b("packages/translator/src/__tests__/fixtures/dynamic-tag-custom-tags/components/child1.marko"),"#text/0!":h={},"#text/0(":b("packages/translator/src/__tests__/fixtures/dynamic-tag-custom-tags/components/child1.marko")},1:h}),[0,"packages/translator/src/__tests__/fixtures/dynamic-tag-custom-tags/template.marko_0_tagName",])
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
container.querySelector("button").click();

```html
<html>
  <head />
  <body>
    <div>
      Child 2 has 
    </div>
    <!--M/0 #text/0-->
    <button />
    <!--M#0 #button/1-->
    <script>
      (M$h=[]).push((b,s,h)=&gt;({0:{tagName:b("packages/translator/src/__tests__/fixtures/dynamic-tag-custom-tags/components/child1.marko"),"#text/0!":h={},"#text/0(":b("packages/translator/src/__tests__/fixtures/dynamic-tag-custom-tags/components/child1.marko")},1:h}),[0,"packages/translator/src/__tests__/fixtures/dynamic-tag-custom-tags/template.marko_0_tagName",])
    </script>
  </body>
</html>
```

# Mutations
```
inserted #document/html0/body1/div0
removed #comment after #document/html0/body1/div0
removed div after #document/html0/body1/div0
```


# Render 
container.querySelector("button").click();

```html
<html>
  <head />
  <body>
    <div>
      Child 1 has 
    </div>
    <!--M/0 #text/0-->
    <button />
    <!--M#0 #button/1-->
    <script>
      (M$h=[]).push((b,s,h)=&gt;({0:{tagName:b("packages/translator/src/__tests__/fixtures/dynamic-tag-custom-tags/components/child1.marko"),"#text/0!":h={},"#text/0(":b("packages/translator/src/__tests__/fixtures/dynamic-tag-custom-tags/components/child1.marko")},1:h}),[0,"packages/translator/src/__tests__/fixtures/dynamic-tag-custom-tags/template.marko_0_tagName",])
    </script>
  </body>
</html>
```

# Mutations
```
inserted #document/html0/body1/div0
removed div after #document/html0/body1/div0
```