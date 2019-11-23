 
const Bookmark = (dataObj) => {
  observeData(dataObj)

  return {
    data: dataObj
  }

  function makeReactive (obj, key) {
    let val = obj[key]

    Object.defineProperty(obj, key, {
      get () {
        return val
      },
      set (newVal) {
        val = newVal
        parseDOM(obj)
      }
    })
  }

  function observeData (obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        makeReactive(obj, key)
      }
    }

    parseDOM(obj)
  }

  function parseDOM (obj) {
    let count = obj.items.length
    let dropdownNode = document.querySelector('.js-b-dropdown')

    // update counter
    document.querySelector('.js-b-counter').textContent = count

    // render bookmark items
    if (count === 0) {
      dropdownNode.innerHTML = `
      <p class="no-item">
        <span>No bookmark items found.</span>
      </p>
      `
    } else {
      let html = ''
      obj.items.forEach(item => {
        html += `
        <div class="link" >
          <h1><a href="${item.link}" target="_blank" rel="nofollow noopener">${item.title}</h1>
          <div class="meta">
            <a href="http://${item.site}" target="_blank" rel="nofollow noopener">${item.site}</a> | <a href="#" class="js-b-dropdown-remove-bookmark" data-id="${item.link}">remove</a>
          </div>
        </div>
        `
      });
      dropdownNode.innerHTML = html
    }
  }
}

let bookmarkNode = document.querySelector('.bookmark')

const showDropdown = () => {
  bookmarkNode.classList.add('show')
}

const hideDropdown = () => {
  bookmarkNode.classList.remove('show')
}

// // Generate octicons
// let octiconsEl = document.querySelectorAll('.i-octicon')
// octiconsEl.forEach((oct) => {
//   let icon = oct.getAttribute('data-icon')
//   if (octicons[icon]) {
//     oct.innerHTML = octicons[icon].toSVG()
//   }
// })

// Initialize the bookmark
let b = Bookmark({
  items: localStorage.getItem('bookmark_items') ? JSON.parse(localStorage.getItem('bookmark_items')) : []
})

// Highlight the bookmark icon of added items.
b.data.items.forEach(item => {
  document.querySelectorAll(`[data-link="${item.link}"]`).forEach(node => {
    node.classList.add('added')
  })
})

// Toggle show/hide dropdown
document.querySelector('.js-b-indicator').addEventListener('click', (e) => {
  e.preventDefault()
  if (!bookmarkNode.classList.contains('show')) {
    showDropdown()
  } else {
    hideDropdown()
  }
})

document.addEventListener('click', (e) => {
  if (!bookmarkNode.contains(e.target)) {
    hideDropdown()
  }
})

document.querySelector('.js-b-close-mobile-dropdown').addEventListener('click', () => {
  hideDropdown()
})

// Add/remove bookmark
document.querySelectorAll('.js-b-additem').forEach(node => {
  node.addEventListener('click', (e) => {
    e.preventDefault()
    let items = b.data.items
    let link = node.getAttribute('data-link')
    // Add item
    if (!node.classList.contains('added')) {
      if (items.filter(item => item.link === link).length > 0) {
        return
      }

      node.classList.add('added')

      items.push({
        link: link,
        title: node.getAttribute('data-title'),
        date: node.getAttribute('data-date'),
        site: node.getAttribute('data-site')
      })

      b.data.items = items
    } else { // Remove item
      items = b.data.items.filter(item => {
        return item.link !== link
      })

      node.classList.remove('added')

      b.data.items = items
    }

    localStorage.setItem('bookmark_items', JSON.stringify(items))
  })
})

// Remove bookmark in the dropdown list.
document.addEventListener('click', (e) => {
  if ( ! e.target.classList.contains('js-b-dropdown-remove-bookmark') ) {
    return
  }

  e.preventDefault()

  let link = e.target.getAttribute('data-id')
  let items = b.data.items.filter(item => {
    return item.link !== link
  })

  b.data.items = items

  localStorage.setItem('bookmark_items', JSON.stringify(items))

  let addedNode = document.querySelector(`[data-link="${link}"]`)
  addedNode.classList.remove('added')
})
