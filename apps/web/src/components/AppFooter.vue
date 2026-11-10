<template>
  <footer class="footer">
    <div class="footer-content">
      <p>Помощь и предложения:</p>
      <div class="contacts">
        <a href="tel:+79000000000">📱 +7 (900) 000-00-00</a>
        <a href="https://t.me/admin_name" target="_blank">✈️ Telegram: @admin_name</a>
      </div>
      <p class="copy">© 2026 Кинотеатр. Все права защищены.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer { background-color: var(--surface-color); padding: 30px 20px; margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; color: var(--text-muted); font-size: 14px; }
.footer-content { max-width: 1200px; margin: 0 auto; }
.contacts { display: flex; justify-content: center; gap: 20px; margin: 10px 0 20px; }
.contacts a { color: var(--text-main); transition: color 0.2s; }
.contacts a:hover { color: var(--accent-color); }
.copy { opacity: 0.5; }
</style>