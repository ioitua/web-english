class Carousel {
  constructor(mountElement, options) {
    this.mountElement = (typeof mountElement === 'string')
      ? document.querySelector(mountElement)
      : mountElement;
    this.mountElement.classList.add('carousel');

    this.items = Array.from(this.mountElement.children)
      .map((childElement) => {
        childElement.classList.add('carousel-item');

        return childElement;
      });

    this.current = 0;
    this.items[this.current].classList.add('active');

    this.mountControls();

    // Process options
    this.options = Object.assign({
      duration: 5000,
    }, options);
  }

  mountControls() {
    const controlsElement = document.createElement('div');

    controlsElement.className = 'carousel-controls';
    controlsElement.innerHTML = `
      <button class="carousel-control carousel-control-left">
        <span class="carousel-control-caption">Previous</span>
      </button>
      <button class="carousel-control carousel-control-right">
        <span class="carousel-control-caption">Next</span>
      </button>
    `;

    controlsElement.querySelector('.carousel-control-left').onclick =
      this.prev.bind(this);
    controlsElement.querySelector('.carousel-control-right').onclick =
      this.next.bind(this);

    this.mountElement.appendChild(controlsElement);
  }

  start() {
    this.timeOut = setTimeout(() => {
      this.next();
    }, this.options.duration);
  }

  stop() {
    clearTimeout(this.timeOut);
  }

  slide(index) {
    const lastItem = this.items[this.current];
    const nextItem = this.items[index];

    lastItem.classList.remove('active');
    nextItem.classList.add('active');

    this.current = index;

    // Avoid unexpected behavior with user actions
    // Reset timer if user clicked on a button
    this.stop();
    this.start();
  }

  next() {
    this.slide((this.current + 1) % this.items.length)
  }

  prev() {
    this.slide((this.items.length + this.current - 1) % this.items.length);
  }
}
