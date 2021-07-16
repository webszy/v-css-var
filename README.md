# v-css-var
use CSS Variables by vue directive
#### install the package
> npm i v-css-var

#### use it in main.js
```javascript
import cssVar from 'v-css-var'
Vue.use(cssVar)
```
#### basic use
```Vue
<template>
  <div v-css-var="var"></div>
</template>
<script>
export default {
  data(){
    return {
      var:{
        a:'1px' // not suggest start with --,like '--a':'1px',but supported
      }
    }
  }
}
</script>
<style>
div{
  height: var(--a);
}
</style>
```
It will be transfed as 
```html
<div style="--a:'1'"></div>
```
If you want share the vars to all,
you can add it to the html element
```Vue
<template>
  <div v-css-var.root="var"></div>
</template>

```
It will be transfed as
```html
<html style="--a:'1px'">
    <body>
        <div></div>
    </body>
</html>
```
#### TO DO
- [x] remove the css Variables
- [ ] write the test
