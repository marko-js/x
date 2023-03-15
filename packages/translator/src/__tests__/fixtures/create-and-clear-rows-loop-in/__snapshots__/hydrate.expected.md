# Render {"children":{"1":"a","2":"b","3":"c"}}
```html
<html>
  <head />
  <body>
    <div>
      <p>
        1
        <!--M#1 #text/0-->
        : 
        <!---->
        a
        <!--M#1 #text/1-->
      </p>
      <p>
        2
        <!--M#2 #text/0-->
        : 
        <!---->
        b
        <!--M#2 #text/1-->
      </p>
      <p>
        3
        <!--M#3 #text/0-->
        : 
        <!---->
        c
        <!--M#3 #text/1-->
      </p>
      <!--M|0 #div/0 1,2,3-->
    </div>
    <!--M#0 #div/0-->
    <script>
      (M$h=[]).push((b,s)=&gt;({1:{},2:{},3:{}}),[])
    </script>
  </body>
</html>
```

# Mutations
```

```