(function () {
  // Inject Tailwind CSS CDN
  const tailwindScript = document.createElement('script');
  tailwindScript.src = 'https://cdn.tailwindcss.com';
  document.head.appendChild(tailwindScript);

  // Inject custom styles
  const style = document.createElement('style');
  style.textContent = `
    .nav-link {
      position: relative;
      transition: color 0.3s ease;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -2px;
      left: 0;
      background-color: #00aaff;
      transition: width 0.3s ease;
    }
    .nav-link:hover::after {
      width: 100%;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-in {
      animation: fadeIn 0.5s ease-out;
    }
  `;
  document.head.appendChild(style);

  // Create Header
  const header = document.createElement('header');
  header.className = 'bg-gray-950 shadow-lg sticky top-0 z-50';
  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="flex flex-col items-center">
        <p id="greetingShow" class="text-lg font-medium text-gray-300 mb-2 fade-in"></p>
        <p class="text-base text-gray-400 mb-4 text-center">Hi, welcome to the S-Toolkit, a feature-rich website with a free solution of open resources.</p>
        <h1>s-toolkit : powered by tech visionary</h1>
        <nav>
          <ul class="flex justify-center gap-8">
            <li><a href="https://s-toolkit.github.io/home/" accesskey="h" title="Explore our homepage" class="nav-link text-gray-200 hover:text-cyan-400 py-2 px-4">Welcome</a></li>
            <li><a href="https://s-toolkit.github.io/softwares/" accesskey="s" title="Discover intuitive software solutions" class="nav-link text-gray-200 hover:text-cyan-400 py-2 px-4">Applications</a></li>
            <li><a href="https://s-toolkit.github.io/tools/" accesskey="t" title="Unique tools for everyday use" class="nav-link text-gray-200 hover:text-cyan-400 py-2 px-4">Tools</a></li>
            <li><a href="https://techvisionaryarticles.blogspot.com" accesskey="b" title="read your favorite technical tutorials" class="nav-link text-gray-200 hover:text-cyan-400 py-2 px-4">Blogs</a></li>
            <li><a href="https://s-toolkit.github.io/about/" accesskey="a" title="Learn about our mission" class="nav-link text-gray-200 hover:text-cyan-400 py-2 px-4">Our Story</a></li>
            <li><a href="s-toolkit.github.io/contact/" title="Get in touch with us" accesskey="c" class="nav-link text-gray-200 hover:text-cyan-400 py-2 px-4">Connect</a></li>
            <li><a href="https://s-toolkit.github.io/join/" title="Join our company as a contributor" accesskey="j" class="nav-link text-gray-200 hover:text-cyan-400 py-2 px-4">Join us</a></li>
          </ul>
        </nav>
      </div>
    </div>
  `;
  document.body.prepend(header);

  // Create Footer
  const footer = document.createElement('footer');
  footer.className = 'bg-gray-950 border-t border-gray-700 py-6';
  footer.innerHTML = `
    <h3>you should go</h3>
    <div class="max-w-7xl mx-auto px-4 text-center">
            <li><a href="https://s-toolkit.github.io/join/" title="Join our company as a contributor" class="nav-link text-gray-200 hover:text-cyan-400 py-2 px-4">Join us</a></li>
      <li><a href="s-toolkit.github.io/contact/" class="text-gray-200 hover:text-cyan-400 mx-4 transition-colors duration-300">Connect With Us</a></li>
      <li><a href="https://s-toolkit.github.io/about/" class="text-gray-200 hover:text-cyan-400 mx-4 transition-colors duration-300">Our Story</a></li>
    </div>
  `;
  document.body.append(footer);

  // Dynamic greeting based on local time
  function setGreeting() {
    const greetingElement = document.getElementById('greetingShow');
    const hour = new Date().getHours();
    let greeting;

    if (hour >= 5 && hour < 12) {
      greeting = 'Good Morning, Visitor!';
    } else if (hour >= 12 && hour < 17) {
      greeting = 'Good Afternoon, Visitor!';
    } else if (hour >= 17 && hour < 22) {
      greeting = 'Good Evening, Visitor!';
    } else {
      greeting = 'Good Night, Visitor!';
    }

    greetingElement.textContent = greeting;
  }

  // Initialize greeting on page load
  document.addEventListener('DOMContentLoaded', setGreeting);

  // Update greeting every minute
  setInterval(setGreeting, 60000);
})();