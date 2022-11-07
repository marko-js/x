# Write
  <body><!M#0 0><button><!M#1 0>0</button></body><script>(M$h=[]).push((b,s)=>({0:[,,0]}),["counter",0,])</script>


# Render "End"
```html
<html>
  <head />
  <body>
    <!--M#0 0-->
    <button>
      <!--M#1 0-->
      0
    </button>
    <script>
      (M$h=[]).push((b,s)=&gt;({0:[,,0]}),["counter",0,])
    </script>
  </body>
</html>
```

# Mutations
```
inserted #document/html0
inserted #document/html0/head0
inserted #document/html0/body1
inserted #document/html0/body1/#comment0
inserted #document/html0/body1/button1
inserted #document/html0/body1/button1/#comment0
inserted #document/html0/body1/button1/#text1
inserted #document/html0/body1/script2
inserted #document/html0/body1/script2/#text0
```


# Render "Hydrate"
```html
<html>
  <head />
  <body>
    <!--M#0 0-->
    <button>
      <!--M#1 0-->
      0
    </button>
    <script>
      (M$h=[]).push((b,s)=&gt;({0:[,,0]}),["counter",0,])
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
<html>
  <head />
  <body>
    <!--M#0 0-->
    <button>
      <!--M#1 0-->
      1
    </button>
    <script>
      (M$h=[]).push((b,s)=&gt;({0:[,,0]}),["counter",0,])
    </script>
  </body>
</html>
```

# Mutations
```
#document/html0/body1/button1/#text1: "0" => "1"
```


# Render 
container.querySelector("button").click();

```html
<html>
  <head />
  <body>
    <!--M#0 0-->
    <button>
      <!--M#1 0-->
      2
    </button>
    <script>
      (M$h=[]).push((b,s)=&gt;({0:[,,0]}),["counter",0,])
    </script>
  </body>
</html>
```

# Mutations
```
#document/html0/body1/button1/#text1: "1" => "2"
```


# Render 
container.querySelector("button").click();

```html
<html>
  <head />
  <body>
    <!--M#0 0-->
    <button>
      <!--M#1 0-->
      3
    </button>
    <script>
      (M$h=[]).push((b,s)=&gt;({0:[,,0]}),["counter",0,])
    </script>
  </body>
</html>
```

# Mutations
```
#document/html0/body1/button1/#text1: "2" => "3"
```