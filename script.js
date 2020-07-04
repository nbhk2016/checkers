'use strict'

let field = [[], [], [], [], [], [], [], []]


class Figure {
	constructor(x, y, color){
		this.x = x
		this.y = y
		this.color = color
	}

	move(x, y){
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

	goTo(x, y){
		if ((this.x != x && this.y != y) && (!field[x][y].figure) && field[x][y].color == 'black') {
			if (Math.abs(this.x - x) == 1 && (this.color == 'black' && this.y - y == -1 || this.color == 'white' && this.y - y == 1))
				this.move(x, y)
			 
			else if (Math.abs(this.x - x) == 2 && (this.color == 'black' && this.y - y == -2 || this.color == 'white' && this.y - y == 2)){
				if (this.color == 'white'){
					if (this.x - x == 2 && field[this.x - 1][this.y - 1].figure && field[x + 1][y + 1].figure && field[x + 1][y + 1].figure.color == 'black' && field[this.x - 1][this.y - 1].figure == field[x + 1][y + 1].figure){
						this.move(x, y)
						field[x + 1][y + 1].figure.del()
					}

					else if (this.x - x == -2 && field[this.x + 1][this.y - 1].figure && field[x - 1][y + 1].figure && field[x - 1][y + 1].figure.color == 'black' && field[this.x + 1][this.y - 1].figure == field[x - 1][y + 1].figure){
						this.move(x, y)
						field[x - 1][y + 1].figure.del()
					}
				} 

				else if (this.color == 'black'){
					if (this.x - x == -2 && field[x - 1][y - 1].figure && field[this.x + 1][this.y + 1].figure && field[x - 1][y - 1].figure == field[this.x + 1][this.y + 1].figure && field[this.x + 1][this.y + 1].figure.color == 'white'){
						this.move(x, y)
						field[x - 1][y - 1].figure.del()
					}

					else if (this.x - x == 2 && field[x + 1][y - 1].figure && field[this.x - 1][this.y + 1].figure && field[x + 1][y - 1].figure == field[this.x - 1][this.y + 1].figure && field[this.x - 1][this.y + 1].figure.color == 'white'){
						this.move(x, y)
						field[x + 1][y - 1].figure.del()
					}

				}
			}
		}

		
	}

	del(){
		delete field[this.x][this.y].figure
		document.querySelectorAll(`td[data-x="${this.x}"][data-y="${this.y}"]>span`)[0].remove()
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
	let x = Number(item.getAttribute('data-x'))
	let y = Number(item.getAttribute('data-y'))
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
		let x = Number(event.currentTarget.getAttribute('data-x'))
		let y = Number(event.currentTarget.getAttribute('data-y'))

		if (counter == 0 && field[x][y].figure){
			counter = 1
			coords = [x, y]
		}

		else if (counter == 1){
			field[coords[0]][coords[1]].figure.goTo(x, y)
			counter = 0
		}
	})