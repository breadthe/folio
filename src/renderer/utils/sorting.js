const byQtyAsc = function (a, b) {
  return parseFloat(a.qty) - parseFloat(b.qty)
}

const byQtyDesc = function (a, b) {
  return parseFloat(b.qty) - parseFloat(a.qty)
}

const byNameAsc = function (a, b) {
  var nameA = a.name.toUpperCase()
  var nameB = b.name.toUpperCase()
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }
  return 0
}

const byNameDesc = function (a, b) {
  var nameA = a.name.toUpperCase()
  var nameB = b.name.toUpperCase()
  if (nameA > nameB) {
    return -1
  }
  if (nameA < nameB) {
    return 1
  }
  return 0
}

export {
  byNameAsc,
  byNameDesc,
  byQtyAsc,
  byQtyDesc
}
