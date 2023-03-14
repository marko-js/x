# Render {"to":3}
```html
<div />
```

# Mutations
```
inserted div0
```


# Render {"from":4,"to":6}
```html
<div>
  4, 
</div>
```

# Mutations
```
inserted div0/#text0
inserted div0/#text1
```


# Render {"from":7,"to":16,"step":3}
```html
<div>
  7, 10, 13, 16, 
</div>
```

# Mutations
```
inserted div0/#text0
inserted div0/#text1
inserted div0/#text2
inserted div0/#text3
inserted div0/#text4
inserted div0/#text5
inserted div0/#text6
inserted div0/#text7
removed #text before #text
removed #text before div0/#text0
```


# Render {"from":0,"to":-1,"step":0.3}
```html
<div />
```

# Mutations
```
removed #text, #text, #text, #text, #text, #text, #text, #text in div0
```


# Render {"from":0,"to":3,"step":0.5}
```html
<div>
  0, 0.5, 1, 1.5, 2, 2.5, 3, 
</div>
```

# Mutations
```
inserted div0/#text0
inserted div0/#text1
inserted div0/#text2
inserted div0/#text3
inserted div0/#text4
inserted div0/#text5
inserted div0/#text6
inserted div0/#text7
inserted div0/#text8
inserted div0/#text9
inserted div0/#text10
inserted div0/#text11
inserted div0/#text12
inserted div0/#text13
```