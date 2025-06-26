document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.has-tooltip');
  
  elements.forEach(element => {
    element.addEventListener('click', function(e) {
      e.preventDefault();
      
      const activeTooltip = document.querySelector('.tooltip_active');
      if (activeTooltip) {
        activeTooltip.remove();
      }
      
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.textContent = this.title;
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = `${rect.left}px`;
      tooltip.style.top = `${rect.bottom}px`;
      
      document.body.appendChild(tooltip);
      tooltip.classList.add('tooltip_active');
    });
  });
});