# Write
  <div><p>1<!M#1 #text/0>: <!>a<!M#1 #text/1></p><p>2<!M#2 #text/0>: <!>b<!M#2 #text/1></p><p>3<!M#3 #text/0>: <!>c<!M#3 #text/1></p><!M|0 #div/0 1,2,3></div><!M#0 #div/0><script>(M$h=[]).push((b,s)=>({1:{},2:{},3:{}}),[])</script>


# Render "End"
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
inserted #document/html0
inserted #document/html0/head0
inserted #document/html0/body1
inserted #document/html0/body1/div0
inserted #document/html0/body1/div0/p0
inserted #document/html0/body1/div0/p0/#text0
inserted #document/html0/body1/div0/p0/#comment1
inserted #document/html0/body1/div0/p0/#text2
inserted #document/html0/body1/div0/p0/#comment3
inserted #document/html0/body1/div0/p0/#text4
inserted #document/html0/body1/div0/p0/#comment5
inserted #document/html0/body1/div0/p1
inserted #document/html0/body1/div0/p1/#text0
inserted #document/html0/body1/div0/p1/#comment1
inserted #document/html0/body1/div0/p1/#text2
inserted #document/html0/body1/div0/p1/#comment3
inserted #document/html0/body1/div0/p1/#text4
inserted #document/html0/body1/div0/p1/#comment5
inserted #document/html0/body1/div0/p2
inserted #document/html0/body1/div0/p2/#text0
inserted #document/html0/body1/div0/p2/#comment1
inserted #document/html0/body1/div0/p2/#text2
inserted #document/html0/body1/div0/p2/#comment3
inserted #document/html0/body1/div0/p2/#text4
inserted #document/html0/body1/div0/p2/#comment5
inserted #document/html0/body1/div0/#comment3
inserted #document/html0/body1/#comment1
inserted #document/html0/body1/script2
inserted #document/html0/body1/script2/#text0
```