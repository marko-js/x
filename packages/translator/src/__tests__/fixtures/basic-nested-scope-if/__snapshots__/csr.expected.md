# Render {}
```html
<div>
  <button>
    0
  </button>
</div>
```

# Mutations
```
inserted div0
```


# Render 
container.querySelector("button").click();

```html
<div>
  <button>
    1
  </button>
</div>
```

# Mutations
```
div0/button0/#text0: "0" => "1"
```


# Render 
container.querySelector("button").click();

```html
<div>
  <button>
    2
  </button>
</div>
```

# Mutations
```
div0/button0/#text0: "1" => "2"
```


# Render 
container.querySelector("button").click();

```html
<div />
```

# Mutations
```
inserted div0/#text0
removed  after div0/#text0
```