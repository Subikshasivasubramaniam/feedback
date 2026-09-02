// ---------- Helpers ----------
function showMessage(el, text, type) {
  el.textContent = text;
  el.className = `message ${type}`;
}

function starString(rating) {
  const filled = '★'.repeat(rating);
  const empty = '☆'.repeat(5 - rating);
  return filled + empty;
}

// ---------- Level 4: Feedback form submission ----------
const feedbackForm = document.getElementById('feedbackForm');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formMessage = document.getElementById('formMessage');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const event = document.getElementById('event').value;
    const rating = document.getElementById('rating').value;
    const message = document.getElementById('message').value.trim();

    // Level 4 - Task 4: Basic client-side validation (empty fields)
    if (!name || !email || !event || !rating || !message) {
      showMessage(formMessage, 'Please fill out all fields before submitting.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, event, rating, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Level 4 - Task 2: Show a success message after submission
        showMessage(formMessage, '✅ Thank you! Your feedback has been submitted.', 'success');
        feedbackForm.reset();
      } else {
        showMessage(formMessage, data.error || 'Something went wrong. Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      showMessage(formMessage, 'Could not reach the server. Please try again later.', 'error');
    }
  });
}

// ---------- Level 4 - Task 3: Fetch and display feedback ----------
const feedbackContainer = document.getElementById('feedbackContainer');

if (feedbackContainer) {
  const listMessage = document.getElementById('listMessage');

  fetch('/api/feedback')
    .then((res) => res.json())
    .then((data) => {
      if (!data.success || data.data.length === 0) {
        feedbackContainer.innerHTML = '<p style="color:#6b7280;">No feedback submitted yet. Be the first!</p>';
        return;
      }

      feedbackContainer.innerHTML = data.data
        .map(
          (item) => `
        <div class="card feedback-item">
          <h3>${escapeHtml(item.event)}</h3>
          <p>${escapeHtml(item.message)}</p>
          <div class="meta">
            <span>By ${escapeHtml(item.name)}</span>
            <span class="stars">${starString(item.rating)}</span>
          </div>
        </div>
      `
        )
        .join('');
    })
    .catch((err) => {
      console.error(err);
      showMessage(listMessage, 'Could not load feedback from the server.', 'error');
    });
}

// Basic escaping to avoid rendering raw HTML from user input
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
