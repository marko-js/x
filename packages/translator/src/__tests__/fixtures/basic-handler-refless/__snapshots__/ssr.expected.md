# Write
  <!M#0 0><button><!M#1 0>0</button><script>(M$h=[]).push(null,["packages/translator/src/__tests__/fixtures/basic-handler-refless/template.marko_0",0,])</script>


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
      (M$h=[]).push(null,["packages/translator/src/__tests__/fixtures/basic-handler-refless/template.marko_0",0,])
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
      (M$h=[]).push(null,["packages/translator/src/__tests__/fixtures/basic-handler-refless/template.marko_0",0,])
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
      (M$h=[]).push(null,["packages/translator/src/__tests__/fixtures/basic-handler-refless/template.marko_0",0,])
    </script>
  </body>
</html>
```

# Mutations
```
html1/body1/button0/#text1: "0" => "1"
```