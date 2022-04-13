# Write
  <!M#0 0><button><!M#1 0>0</button><script>(M$h=[]).push((b,s)=>({"0":[,,0]}),["packages/translator/src/__tests__/fixtures/basic-fn-with-block/template.marko_0_count",0,])</script>


# Render "End"
```html
<!--M#0 0-->
<html>
  <head />
  <body>
    <button>
      <!--M#1 0-->
      0
    </button>
    <script>
      (M$h=[]).push((b,s)=&gt;({"0":[,,0]}),["packages/translator/src/__tests__/fixtures/basic-fn-with-block/template.marko_0_count",0,])
    </script>
  </body>
</html>
```

# Mutations
```
inserted #comment0
inserted html1
inserted html1/head0
inserted html1/body1
inserted html1/body1/button0
inserted html1/body1/button0/#comment0
inserted html1/body1/button0/#text1
inserted html1/body1/script1
inserted html1/body1/script1/#text0
```


# Render "Hydrate"
```html
<!--M#0 0-->
<html>
  <head />
  <body>
    <button>
      <!--M#1 0-->
      0
    </button>
    <script>
      (M$h=[]).push((b,s)=&gt;({"0":[,,0]}),["packages/translator/src/__tests__/fixtures/basic-fn-with-block/template.marko_0_count",0,])
    </script>
  </body>
</html>
```

# Mutations
```

```


# Render 
container.querySelector("button").click();

```html
<!--M#0 0-->
<html>
  <head />
  <body>
    <button>
      <!--M#1 0-->
      1
    </button>
    <script>
      (M$h=[]).push((b,s)=&gt;({"0":[,,0]}),["packages/translator/src/__tests__/fixtures/basic-fn-with-block/template.marko_0_count",0,])
    </script>
  </body>
</html>
```

# Mutations
```
html1/body1/button0/#text1: "0" => "1"
```


# Render 
container.querySelector("button").click();

```html
<!--M#0 0-->
<html>
  <head />
  <body>
    <button>
      <!--M#1 0-->
      2
    </button>
    <script>
      (M$h=[]).push((b,s)=&gt;({"0":[,,0]}),["packages/translator/src/__tests__/fixtures/basic-fn-with-block/template.marko_0_count",0,])
    </script>
  </body>
</html>
```

# Mutations
```
html1/body1/button0/#text1: "1" => "2"
```


# Render 
container.querySelector("button").click();

```html
<!--M#0 0-->
<html>
  <head />
  <body>
    <button>
      <!--M#1 0-->
      3
    </button>
    <script>
      (M$h=[]).push((b,s)=&gt;({"0":[,,0]}),["packages/translator/src/__tests__/fixtures/basic-fn-with-block/template.marko_0_count",0,])
    </script>
  </body>
</html>
```

# Mutations
```
html1/body1/button0/#text1: "2" => "3"
```