import React from "react";


const Footer = () => {
    return (
        <>
              <footer class="px-4 lg:px-8 py-6 text-xs text-slate-500">
        <div class="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div>© 2025 Agentnic Voice Note</div>
          <div class="flex items-center gap-3">
            <a href="15-help.html" class="hover:underline">Help</a>
            <a href="#" class="hover:underline">Privacy</a>
            <a href="#" class="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
        </>
    )
}

export default Footer;