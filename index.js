/* eslint-disable no-useless-return,no-useless-escape,camelcase,semi,no-cond-assign */
const env = process.env.NODE_ENV
const handleVars = (varItem, addPrefix) => {
  varItem = varItem.map(e => e + '')
  if (addPrefix) {
    varItem[0] = '--' + varItem[0]
  }
  return {
    varsName: varItem[0],
    varsValue: varItem[1]
  }
}
const changeVars = (el, binding, prefix) => {
  const vars = Object.entries(binding.value)
  const dom = binding.modifiers.root ? document.documentElement : el
  for (const k of vars) {
    const {
      varsName,
      varsValue
    } = handleVars(k, prefix)
    dom.style.setProperty(varsName, varsValue)
  }
  logger('changeVars', vars)
}
const logger = (msg, a) => {
  if (env !== 'production') {
    return console.log(msg, a || '')
  }
}
export default {
  install: function (Vue, options) {
    const isSupported =
        window.CSS &&
        window.CSS.supports &&
        window.CSS.supports('--a', '0')
    if (isSupported) {
      Vue.directive('cssVar', {
        bind: function (el, binding) {
          if (!binding.value) {
            return
          }
          changeVars(el, binding, options.prefix)
        },
        update: function (el, binding) {
          if (!binding.value) {
            return
          }
          const dom = binding.modifiers.root ? document.documentElement : el
          logger('cssVar updated')
          // get all cssVars in the dom
          const vars = Object.entries(binding.value)
          for (const k of vars) {
            const {
              varsName,
              varsValue
            } = handleVars(k, options.prefix)
            const oldValue = dom.style.getPropertyValue(varsName)
            if (oldValue !== varsValue) {
              dom.style.setProperty(varsName, varsValue)
            }
          }
        }
      })
    } else {
      console.log('Your browser are not support CSS Variables')
    }
  }
}
