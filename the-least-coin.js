function MinCoinChange(coins){
  let coins = coins
  let cache = {}
  this.makeChange = function(amount) {
    let me = this
    if (!amount){
      return []
    }
    if (cache[amount]) {
      return cache[amount]
    }
    let min = [], newMin, newAmount
    for (let i = 0; i < coins.length; i++) {
      let coin = coins[i]
      newAmount = amount - coin
      if (newAmount >= 0) {
        newMin = me.makeChange(newAmount)
      }
      // if (newAmount >= 0 && (newMin.length < min.length))
    }
  }
}