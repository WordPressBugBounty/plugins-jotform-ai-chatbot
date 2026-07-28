/* global jotformWebsiteWidgetsBanner */

const banners = document.querySelectorAll('.jotform-website-widgets-banner');

banners.forEach((banner, index) => {
  if (index > 0) {
    banner.remove();
  }
});

document.addEventListener('click', (event) => {
  const dismissButton = event.target.closest('.jotform-website-widgets-banner .notice-dismiss');

  if (!dismissButton || typeof jotformWebsiteWidgetsBanner === 'undefined') {
    return;
  }

  const formData = new FormData();
  formData.append('action', 'jotform_dismiss_website_widgets_banner');
  formData.append('nonce', jotformWebsiteWidgetsBanner.nonce);

  window.fetch(jotformWebsiteWidgetsBanner.ajaxUrl, {
    method: 'POST',
    credentials: 'same-origin',
    body: formData
  });
});
