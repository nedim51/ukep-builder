import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

interface Card {
    x: number;
    y: number;
    id: number;
    name: string;
    editing: boolean;
    connectionStartPoint: { x: number; y: number };
    connectionEndPoint: { x: number; y: number };
    leftConnectionPoint: { x: number; y: number };
  }
  
  interface Connection {
    from: number;
    to: number;
    startPoint: { x: number; y: number };
    endPoint: { x: number; y: number };
  }

@Component({
    selector: 'app-card-canvas',
    standalone: true,
    template: `
    <canvas #cardCanvas
            (mousedown)="onMouseDown($event)"
            (mousemove)="onMouseMove($event)"
            (mouseup)="onMouseUp($event)"></canvas>
    <button (click)="addCard()">Добавить карточку</button>
  `,
    styles: ['canvas { border: 1px solid #000; cursor: crosshair; }']
})
export class CardCanvasComponent {
    @ViewChild('cardCanvas', { static: true }) cardCanvasRef!: ElementRef;

    private cardCanvas!: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null = null;

    private isDragging = false;
    private startDragX = 0;
    private startDragY = 0;
    private draggedCard: Card | null = null;

    private cards: Card[] = [];
    private connections: Connection[] = [];
    private selectedConnectionPoint: Card | undefined;

    constructor(private renderer: Renderer2) { }

    ngAfterViewInit() {
        this.cardCanvas = this.cardCanvasRef.nativeElement;
        this.ctx = this.cardCanvas.getContext('2d');

        this.resizeCanvas();
        this.drawCards();
    }

    resizeCanvas() {
        if (this.ctx) {
            this.renderer.setAttribute(this.cardCanvas, 'width', '840');
            this.renderer.setAttribute(this.cardCanvas, 'height', '640');
        }
    }

    drawCards() {
        if (!this.ctx) {
            console.error('Canvas context is null.');
            return;
        }

        // Очищаем холст
        this.ctx.clearRect(0, 0, this.cardCanvas.width, this.cardCanvas.height);

        // Отрисовываем связи сначала
        this.drawConnections();

        // Отрисовываем карточки
        this.cards.forEach(card => {
            if (this.ctx) {
                this.ctx.fillStyle = 'lightblue';
                this.ctx.fillRect(card.x, card.y, 200, 300);

                this.ctx.strokeStyle = 'black';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(card.x, card.y, 200, 300);
            }

            this.drawText(`Card ${card.id}`, card.x + 10, card.y + 30);

            if (card.editing) {
                // this.drawInput(card);
            } else {
                this.drawConnectionPoint(card, 'yellow');
            }
        });
    }

    drawConnections() {
        this.connections.forEach(connection => {
            const fromCard = this.cards.find(card => card.id === connection.from);
            const toCard = this.cards.find(card => card.id === connection.to);

            if (fromCard && toCard) {
                const fromMidX = fromCard.x + 200;
                const fromMidY = fromCard.y + 150;

                const toMidX = toCard.x + 200;
                const toMidY = toCard.y + 150;
                if (this.ctx) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(fromMidX, fromMidY);
                    this.ctx.lineTo(toMidX, toMidY);
                    this.ctx.stroke();
                }
            }
        });
    }

    drawInput(card: Card) {
        const inputWidth = 180;
        const inputHeight = 20;

        const inputX = card.x + 10;
        const inputY = card.y + 30;

        if (this.ctx) {
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(inputX, inputY, inputWidth, inputHeight);

            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(inputX, inputY, inputWidth, inputHeight);

            this.ctx.fillStyle = 'black';
            this.ctx.font = '14px Arial';
            this.ctx.fillText(card.name, inputX + 5, inputY + inputHeight - 5);

        }
    }

    drawConnectionPoint(card: Card, color: string) {
        const midX = card.x + 200;
        const midY = card.y + 150;
      
        const leftX = card.x;
        const leftY = card.y + 150;
      
        if (this.ctx) {
          this.ctx.fillStyle = color;
          this.ctx.beginPath();
          this.ctx.arc(midX, midY, 5, 0, 2 * Math.PI);
          this.ctx.arc(leftX, leftY, 5, 0, 2 * Math.PI); // Отрисовываем точку на левой стороне
          this.ctx.fill();
        }
      }

    drawText(text: string, x: number, y: number) {
        if (this.ctx) {
            this.ctx.fillStyle = 'black';
            this.ctx.font = '20px Arial';
            this.ctx.fillText(text, x, y);
        }
    }

    

    private isDraggingCard(card: Card, mouseX: number, mouseY: number): boolean {
        return (
            mouseX >= card.x &&
            mouseX <= card.x + 200 &&
            mouseY >= card.y &&
            mouseY <= card.y + 300
        );
    }

    // Инициализируем точки начала и конца связи при добавлении новой карточки
    addCard() {
        const newCard: Card = {
          x: 50,
          y: 50,
          id: this.cards.length + 1,
          name: `Card ${this.cards.length + 1}`,
          editing: false,
          connectionStartPoint: { x: 200, y: 150 },
          connectionEndPoint: { x: 200, y: 150 },
          leftConnectionPoint: { x: 0, y: 150 }, // Начальные координаты точки соединения на левой стороне
        };
      
        this.cards.push(newCard);
        this.checkAndFixCollisions();
        this.drawCards();
      }

    checkConnectionIntersection(cardA: Card, cardB: Card): boolean {
        const midXA = cardA.x + 200;
        const midYA = cardA.y + 150;

        const midXB = cardB.x + 200;
        const midYB = cardB.y + 150;

        // Проверяем пересечение прямоугольников, в которых находятся карточки
        if (
            midXA < cardB.x ||
            midXA > cardB.x + 200 ||
            midYA < cardB.y ||
            midYA > cardB.y + 300 ||
            midXB < cardA.x ||
            midXB > cardA.x + 200 ||
            midYB < cardA.y ||
            midYB > cardA.y + 300
        ) {
            return false;
        }

        // Проверяем пересечение линий связей
        const dx1 = midXA - midXB;
        const dy1 = midYA - midYB;
        const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

        const dx2 = midXA - cardB.x;
        const dy2 = midYA - cardB.y;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        const dx3 = midXB - cardA.x;
        const dy3 = midYB - cardA.y;
        const distance3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);

        // Проверяем, пересекаются ли линии связей
        if (distance2 + distance3 <= distance1 + 0.1) {
            return true;
        }

        return false;
    }


    checkAndFixCollisions() {
        for (let i = 0; i < this.cards.length; i++) {
            for (let j = i + 1; j < this.cards.length; j++) {
                const cardA = this.cards[i];
                const cardB = this.cards[j];

                const dx = cardA.x - cardB.x;
                const dy = cardA.y - cardB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    const angle = Math.atan2(dy, dx);
                    const offsetX = (200 - distance) / 2 * Math.cos(angle);
                    const offsetY = (200 - distance) / 2 * Math.sin(angle);

                    cardA.x += offsetX;
                    cardA.y += offsetY;
                    cardB.x -= offsetX;
                    cardB.y -= offsetY;
                }
            }
        }

        // Проверяем пересечения связей
        for (let i = 0; i < this.connections.length; i++) {
            const connectionA = this.connections[i];
            const cardA = this.cards.find(card => card.id === connectionA.from);

            if (!cardA) {
                continue;
            }

            for (let j = i + 1; j < this.connections.length; j++) {
                const connectionB = this.connections[j];
                const cardB = this.cards.find(card => card.id === connectionB.from);

                if (!cardB) {
                    continue;
                }

                const intersect = this.checkConnectionIntersection(cardA, cardB);

                if (intersect) {
                    // Перемещаем одну из карточек, чтобы избежать пересечения связей
                    cardA.x += 10;
                    cardA.y += 10;

                    this.checkAndFixCollisions(); // Повторно проверяем коллизии
                    return;
                }
            }
        }
    }



    // В методе onMouseDown устанавливаем, с какой точки начинается связь
    onMouseDown(event: MouseEvent) {
        const mouseX = event.clientX - this.cardCanvas.getBoundingClientRect().left;
        const mouseY = event.clientY - this.cardCanvas.getBoundingClientRect().top;
      
        for (let i = 0; i < this.cards.length; i++) {
          const card = this.cards[i];
          const midX = card.x + card.connectionStartPoint.x;
          const midY = card.y + card.connectionStartPoint.y;
      
          const leftX = card.x + card.leftConnectionPoint.x;
          const leftY = card.y + card.leftConnectionPoint.y;
      
          const distanceToMid = Math.sqrt((mouseX - midX) ** 2 + (mouseY - midY) ** 2);
          const distanceToLeft = Math.sqrt((mouseX - leftX) ** 2 + (mouseY - leftY) ** 2);
      
          if (distanceToMid < 5) {
            this.selectedConnectionPoint = card;
            return;
          } else if (distanceToLeft < 5) {
            this.selectedConnectionPoint = card;
            // Устанавливаем выбранную точку соединения на левую сторону
            this.selectedConnectionPoint.connectionStartPoint = card.leftConnectionPoint;
            return;
          }
        }
      
        this.selectedConnectionPoint = undefined;
      
        for (let i = 0; i < this.cards.length; i++) {
          if (this.isDraggingCard(this.cards[i], mouseX, mouseY)) {
            this.isDragging = true;
            this.startDragX = mouseX - this.cards[i].x;
            this.startDragY = mouseY - this.cards[i].y;
            this.draggedCard = this.cards[i];
            return;
          }
        }
      }

    // В методе onMouseMove устанавливаем координаты точек конца связи
    onMouseMove(event: MouseEvent) {
        if (this.isDragging && this.ctx && this.draggedCard) {
            const mouseX = event.clientX - this.cardCanvas.getBoundingClientRect().left;
            const mouseY = event.clientY - this.cardCanvas.getBoundingClientRect().top;

            this.draggedCard.x = mouseX - this.startDragX;
            this.draggedCard.y = mouseY - this.startDragY;

            // Обновляем координаты точек конца связи
            this.draggedCard.connectionEndPoint.x = mouseX - this.draggedCard.x;
            this.draggedCard.connectionEndPoint.y = mouseY - this.draggedCard.y;

            this.checkAndFixCollisions();
            this.drawCards();
        }

        if (!this.isDragging && this.ctx) {
            const mouseX = event.clientX - this.cardCanvas.getBoundingClientRect().left;
            const mouseY = event.clientY - this.cardCanvas.getBoundingClientRect().top;
        
            this.drawCards();
        
        
            if (this.selectedConnectionPoint) {
                this.ctx.beginPath();
                this.ctx.moveTo(
                  this.selectedConnectionPoint.x + this.selectedConnectionPoint.connectionStartPoint.x,
                  this.selectedConnectionPoint.y + this.selectedConnectionPoint.connectionStartPoint.y
                );
                this.ctx.lineTo(mouseX, mouseY);
                this.ctx.stroke();
              }
            // Отрисовываем временную связь только если нет выбранной точки соединения
            if (!this.selectedConnectionPoint) {
              // Отрисовываем временную связь при наведении на точку соединения
              this.cards.forEach(card => {
                const midX = card.x + card.connectionStartPoint.x;
                const midY = card.y + card.connectionStartPoint.y;
        
                const distance = Math.sqrt((mouseX - midX) ** 2 + (mouseY - midY) ** 2);
        
                if (distance < 5) {
                  this.drawConnectionPoint(card, 'red');
        
                  // Устанавливаем this.selectedConnectionPoint только если мышь в пределах радиуса точки соединения
                  if (distance < 5) {
                    this.selectedConnectionPoint = card;
                  }
                }
              });
            }
          }
        }
        

    // В методе onMouseUp добавляем условие для установки связи
    onMouseUp(event: MouseEvent) {
        if (this.isDragging && this.ctx && this.draggedCard) {
            this.isDragging = false;
            this.draggedCard = null;

            this.drawCards();
        }

        if (this.selectedConnectionPoint) {
            const mouseX = event.clientX - this.cardCanvas.getBoundingClientRect().left;
            const mouseY = event.clientY - this.cardCanvas.getBoundingClientRect().top;

            // Проверяем, попадает ли мышь на точку соединения другой карточки
            const targetCard = this.cards.find(card => {
                const midX = card.x + card.connectionStartPoint.x;
                const midY = card.y + card.connectionStartPoint.y;

                const distance = Math.sqrt((mouseX - midX) ** 2 + (mouseY - midY) ** 2);

                // Устанавливаем targetCard только если мышь в пределах радиуса точки соединения
                return distance < 5;
            });

            if (targetCard && this.selectedConnectionPoint.id !== targetCard.id) {
                this.addConnection(this.selectedConnectionPoint, targetCard);
                this.selectedConnectionPoint = undefined;
            }
        }

        // Завершаем редактирование при отпускании мыши
        for (const card of this.cards) {
            card.editing = false;
        }

        this.drawCards();
    }

    // В методе addConnection добавляем координаты точек начала и конца связи
    addConnection(fromCard: Card, toCard: Card) {
        const existingConnection = this.connections.find(
            connection =>
                connection.from === fromCard.id &&
                connection.to === toCard.id &&
                connection.startPoint === fromCard.connectionStartPoint &&
                connection.endPoint === toCard.connectionEndPoint
        );

        if (!existingConnection) {
            this.connections.push({
                from: fromCard.id,
                to: toCard.id,
                startPoint: fromCard.connectionStartPoint,
                endPoint: toCard.connectionEndPoint,
            });
            this.drawCards();
        }
    }
}
