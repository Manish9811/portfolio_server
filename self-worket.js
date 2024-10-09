self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
  
    const title = data.title || 'Default Title';
    const options = {
      body: data.body || 'Default Body',
      icon: data.icon || 'path/to/icon.png',
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });