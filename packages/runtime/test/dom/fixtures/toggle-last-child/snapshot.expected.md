# Render {"value":"Hello"}
```html
<div>
  <span />
  <span />
  <span>
    Hello
  </span>
</div>
```

# Mutations
```
inserted div0
```


# Render {"value":false}
```html
<div>
  <span />
  <span />
</div>
```

# Mutations
```
removed span after div0/span1
```


# Render {"value":"World"}
```html
<div>
  <span />
  <span />
  <span>
    World
  </span>
</div>
```

# Mutations
```
inserted div0/span2
inserted div0/span2/#text0
```


# Render {"value":"!"}
```html
<div>
  <span />
  <span />
  <span>
    !
  </span>
</div>
```

# Mutations
```
removed #text in div0/span2
inserted div0/span2/#text0
```