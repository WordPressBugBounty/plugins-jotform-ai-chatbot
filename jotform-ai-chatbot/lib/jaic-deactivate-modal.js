/* eslint-disable prefer-destructuring */
// eslint-disable-next-line no-undef
const pluginSlug = jaicPluginData.pluginSlug;
// const pluginSlug = 'jotform-ai-chatbot';
// console.log(pluginSlugA);
document.addEventListener('DOMContentLoaded', () => {
  const deactivateRow = document.querySelector(`tr[data-slug="${pluginSlug}"]`);
  const deactivateLink = deactivateRow.querySelector('.deactivate #deactivate-jotform-ai-chatbot');
  const form = document.getElementById('jaic_deactivate_form');
  const submitButton = document.querySelector('.jaic.primary');
  const cancelButton = document.querySelector('.jaic.secondary');
  const hiddenIframe = document.getElementById('jaic_hidden_iframe');
  const allRadioInputs = document.querySelectorAll('input[name="q4_feedback"]');
  const otherInput = document.getElementById('jaic_other');
  const otherTextInput = document.getElementById('jaic_other_text');
  const otherTextWrapper = document.getElementById('jaic_other_text_wrapper');
  let deactivateUrl = '';

  document.addEventListener('click', (e) => {
    if (e.target.closest(`tr[data-slug="${pluginSlug}"] .deactivate a`)) {
      deactivateUrl = e.target.href;
      document.querySelector('.jaic_modal').style.display = 'flex';
    }
  });

  if (deactivateLink) {
    deactivateLink.addEventListener('click', (e) => {
      // deactivateLink.innerHTML = 'disabled';
      e.preventDefault();
      deactivateUrl = deactivateLink.href;
      document.querySelector('.jaic_modal').style.display = 'flex';
    });
  }

  allRadioInputs.forEach(radio => {
    radio.addEventListener('change', () => {
      otherTextWrapper.style.display = otherInput.checked ? 'flex' : 'none';
    });
  });

  otherInput.addEventListener('change', () => {
    if (otherInput.checked) {
      otherTextWrapper.style.display = 'flex';
    } else {
      otherTextWrapper.style.display = 'none';
    }
  });

  otherTextInput.addEventListener('input', () => {
    // console.log('input');
    if (otherTextInput.value.trim() === '') {
      submitButton.classList.add('disabled');
    } else {
      submitButton.classList.remove('disabled');
    }
  });

  function updateRequirementError() {
    const isOtherSelected = otherInput?.checked;
    const isOtherTextFilled = otherTextInput.value.trim() !== '';

    if (isOtherSelected && !isOtherTextFilled) {
      submitButton.classList.add('disabled');
      return;
    }

    const isAnyRadioSelected = Array.from(allRadioInputs)
      .filter(input => input !== otherInput)
      .some(input => input.checked);

    if (!isAnyRadioSelected && !isOtherSelected) {
      submitButton.classList.add('disabled');
    } else {
      submitButton.classList.remove('disabled');
    }
  }

  document.querySelectorAll('input[name="q4_feedback"]').forEach(input => {
    input.addEventListener('change', updateRequirementError);
  });

  form.addEventListener('submit', (e) => {
    updateRequirementError();

    const isRadioSelected = Array.from(allRadioInputs).some(input => input.checked);

    if (otherInput.checked && otherTextInput.value.trim()) {
      submitButton.classList.remove('disabled');
    }

    if (!isRadioSelected) {
      e.preventDefault();
      return;
    }

    submitButton.classList.add('disabled');
    cancelButton.classList.add('disabled');
    form.style.pointerEvents = 'none';
    submitButton.querySelector('.jaic_text').style.opacity = '0';
    submitButton.querySelector('.jaic_loader').style.opacity = '1';

    setTimeout(() => {
      if (hiddenIframe) {
        if (form) {
          form.reset();
        }
        window.location.href = deactivateUrl;
      }
    }, 1500);
  });

  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      if (form) {
        form.reset();
      }
      document.querySelector('.jaic_modal').style.display = 'none';
    });
  }
});
