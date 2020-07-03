'use strict'

let field = [[], [], [], [], [], [], [], []]


class Figure {
	constructor(x, y, color){
		this.x = x
		this.y = y
		this.color = color
	}

	goTo(x, y){
		if ((this.x != x && this.y != y) && (!field[x][y].figure) && field[x][y].color == 'black') {
			document.querySelectorAll(`td[data-x="${this.x}"][data-y="${this.y}"]>span`)[0].remove()
			delete field[this.x][this.y].figure
			let elem = document.createElement('span')
			if (this.color == 'white'){
				elem.classList.add('whiteFigure')
				elem.setAttribute('data-color', 'white')
			}

			else {
				elem.classList.add('blackFigure')
				elem.setAttribute('data-color', 'black')
			}

			document.querySelectorAll(`td[data-x="${x}"][data-y="${y}"]`)[0].appendChild(elem)

			this.x = x
			this.y = y

			field[x][y].figure = this
		}
	}
}

class Cell {
	constructor(x, y, colorCell, colorFigure){
		this.x = x
		this.y = y
		this.color = colorCell
		if (colorFigure)
			this.figure = new Figure(x, y, colorFigure)
	}
}

let tds = document.getElementsByTagName('td')

for (const item of tds){
	let x = item.getAttribute('data-x')
	let y = item.getAttribute('data-y')
	let color = item.classList[0]

	let figColor = ''

	if (!item.hasChildNodes())
		figColor = null

	else figColor = item.firstChild.getAttribute('data-color')

	field[x][y] = new Cell(x, y, color, figColor)

}

let counter = 0
let coords = []

for (const item of tds)
	item.addEventListener('click', (event) => {
		let x = event.currentTarget.getAttribute('data-x')
		let y = event.currentTarget.getAttribute('data-y')

		if (counter == 0 && field[x][y].figure){
			counter = 1
			coords = [x, y]
		}

		else if (counter == 1){
			field[coords[0]][coords[1]].figure.goTo(x, y)
			counter = 0
		}
	})

