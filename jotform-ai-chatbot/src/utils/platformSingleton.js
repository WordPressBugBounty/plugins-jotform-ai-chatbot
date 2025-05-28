class PlatformSingleton {
  constructor() {
    this.PROVIDER_API_KEY = '';
    this.PROVIDER_API_URL = '';
    this.PROVIDER_URL = '';
    this.PROVIDER_CHATBOT_EMBED_SRC = '';
    this.PLATFORM = '';
    this.PLATFORM_API_URL = '';
    this.PLATFORM_DOMAIN = '';
    this.PLATFORM_PAGES = [];
    this.PLATFORM_PAGE_CONTENTS = [];
    this.PLATFORM_PREVIEW_URL = '';
    this.PLATFORM_NONCE = '';
    this.PLATFORM_REFERER = '';
    this.PLATFORM_KNOWLEDGE_BASE = { urls: [] };
  }
}

export const platformSettings = new PlatformSingleton();
