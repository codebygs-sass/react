import React from "react";


const Product = () => {
    return (
        <>
         <header
      class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16"
      >
     
        <div class="flex items-center space-x-2">
              <img src="./assets/Lo.png" class="w-8 h-8 rounded bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow" />
          <span class="text-lg font-semibold tracking-tight text-gray-900"
            >Albetora</span>
        </div>

        <nav
          class="hidden md:flex items-center space-x-6 text-sm text-gray-700"
        >
          <a
            href="./products.html"
            class="hover:text-blue-600 hover:underline underline-offset-4 transition"
            >Products</a>
          <a
            href="#enterprise"
            class="hover:text-green-600 hover:underline underline-offset-4 transition"
            >Enterprise</a>

          
          <div class="relative group">
            <button
              class="flex items-center gap-1 hover:text-blue-600 hover:underline underline-offset-4 transition"
            >
              <span>Customers</span>
              <svg
                class="w-4 h-4 text-gray-500 group-hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="absolute left-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
            >
              <a href="#customer-stories" class="block p-4 hover:bg-blue-50">
                <h4 class="font-semibold text-gray-900">Customer Stories</h4>
                <p class="text-xs text-gray-600">Real impact by real users.</p>
              </a>
              <a href="#user-community" class="block p-4 hover:bg-blue-50">
                <h4 class="font-semibold text-gray-900">User Community</h4>
                <p class="text-xs text-gray-600">Connect, learn, and grow.</p>
              </a>
              <a href="#training" class="block p-4 hover:bg-blue-50">
                <h4 class="font-semibold text-gray-900">
                  Training & Certification
                </h4>
                <p class="text-xs text-gray-600">Upskill with our resources.</p>
              </a>
            </div>
          </div>

       
          <div class="relative group">
            <button
              class="flex items-center gap-1 hover:text-yellow-600 hover:underline underline-offset-4 transition"
            >
              <span>Partners</span>
              <svg
                class="w-4 h-4 text-gray-500 group-hover:text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="absolute left-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
            >
              <a href="#work-with-partner" class="block p-4 hover:bg-yellow-50">
                <h4 class="font-semibold text-gray-900">Work With a Partner</h4>
                <p class="text-xs text-gray-600">
                  Get expert implementation help.
                </p>
              </a>
              <a href="#become-partner" class="block p-4 hover:bg-yellow-50">
                <h4 class="font-semibold text-gray-900">Become a Partner</h4>
                <p class="text-xs text-gray-600">Grow with our network.</p>
              </a>
            </div>
          </div>

          <a
            href="#resources"
            class="hover:text-red-500 hover:underline underline-offset-4 transition"
            >Resources</a>
          <button class="text-gray-500 hover:text-blue-600">EN</button>
          
          <a href="#profile" class="ml-4">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              class="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 transition"
            />
          </a>
        </nav>

        <button
          id="mobile-nav-toggle"
          class="md:hidden text-gray-600 focus:outline-none"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

    
      <div
        id="mobile-nav"
        class="md:hidden hidden px-4 pb-4 bg-white border-t border-gray-200 shadow text-sm text-gray-800 space-y-2"
      >
        <a
          href="./products.html"
          class="block py-2 hover:text-blue-600 hover:underline underline-offset-4"
          >Products</a>
        <a
          href="#enterprise"
          class="block py-2 hover:text-green-600 hover:underline underline-offset-4"
          >Enterprise</a>


        <div>
          <button
            onclick="toggleSubmenu('mobile-customers')"
            class="flex justify-between items-center w-full py-2 hover:text-blue-600 hover:underline underline-offset-4"
          >
            <span>Customers</span>
            <svg
              id="mobile-customers-arrow"
              class="w-4 h-4 text-gray-400 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div id="mobile-customers" class="hidden pl-4 mt-1 space-y-1">
            <a href="#customer-stories" class="block py-1 hover:text-blue-600"
              >Customer Stories</a>
            <a href="#user-community" class="block py-1 hover:text-blue-600"
              >User Community</a>
            <a href="#training" class="block py-1 hover:text-blue-600"
              >Training & Certification</a>
          </div>
        </div>

    
        <div>
          <button
            onclick="toggleSubmenu('mobile-partners')"
            class="flex justify-between items-center w-full py-2 hover:text-yellow-600 hover:underline underline-offset-4"
          >
            <span>Partners</span>
            <svg
              id="mobile-partners-arrow"
              class="w-4 h-4 text-gray-400 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div id="mobile-partners" class="hidden pl-4 mt-1 space-y-1">
            <a
              href="#work-with-partner"
              class="block py-1 hover:text-yellow-600"
              >Work With a Partner</a>
            <a href="#become-partner" class="block py-1 hover:text-yellow-600"
              >Become a Partner</a>
          </div>
        </div>

        <a
          href="#resources"
          class="block py-2 hover:text-red-500 hover:underline underline-offset-4"
          >Resources</a>
        <div class="flex justify-between items-center pt-2">
          <button class="text-gray-500 hover:text-blue-600">EN</button>
       
        </div>
      </div>

   
    </header>

    <div class="flex min-h-screen bg-gray-50">

      <aside
        class="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-lg z-40"
      >
        <nav class="p-6 space-y-4 text-sm font-semibold tracking-tight">
          <a
            href="#sales"
            class="block px-4 py-3 rounded-lg bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 text-blue-800 hover:shadow transition-all duration-200"
          >
            Sales →
          </a>
          <a
            href="#marketing"
            class="block px-4 py-3 rounded-lg bg-gradient-to-r from-yellow-50 to-white hover:from-yellow-100 text-yellow-800 hover:shadow transition-all duration-200"
          >
            Marketing →
          </a>
          <a
            href="#operations"
            class="block px-4 py-3 rounded-lg bg-gradient-to-r from-green-50 to-white hover:from-green-100 text-green-800 hover:shadow transition-all duration-200"
          >
            Operations →
          </a>
          <a
            href="#hr"
            class="block px-4 py-3 rounded-lg bg-gradient-to-r from-purple-50 to-white hover:from-purple-100 text-purple-800 hover:shadow transition-all duration-200"
          >
            HR →
          </a>
          <a
            href="#clientsuccess"
            class="block px-4 py-3 rounded-lg bg-gradient-to-r from-pink-50 to-white hover:from-pink-100 text-pink-800 hover:shadow transition-all duration-200"
          >
            Client Success →
          </a>
          <a
            href="#finance"
            class="block px-4 py-3 rounded-lg bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 text-gray-800 hover:shadow transition-all duration-200"
          >
            Finance →
          </a>
        </nav>
      </aside>

      <nav
        class="md:hidden bg-white border-b border-gray-200 px-4 py-4 shadow-sm z-40"
      >
        <select
          id="mobile-department"
          class="w-full p-3 border rounded-md bg-white text-gray-800 font-medium focus:ring-2 focus:ring-blue-400"
        >
          <option value="#sales">Sales</option>
          <option value="#marketing">Marketing</option>
          <option value="#operations">Operations</option>
          <option value="#hr">HR</option>
          <option value="#clientsuccess">Client Success</option>
          <option value="#finance">Finance</option>
        </select>
      </nav>

  

      <main
        class="ml-0 md:ml-64 px-6 py-12 bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen space-y-20"
      >
        
        <section id="sales">
          <div class="mb-6">
            <h2 class="text-2xl font-extrabold text-blue-900">
              Sales Department
            </h2>
            <p class="text-gray-500">
              Tools built to help your sales team convert faster.
            </p>
          </div>
          <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div
              class="bg-white border border-blue-200 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 relative overflow-hidden"
            >
              <div
                class="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full opacity-30"
              ></div>
              <h3 class="text-xl font-bold text-blue-700 mb-1">
                📈 Agentic LeadFlow
              </h3>
              <p class="text-gray-600 mb-4">
                Converts more leads by responding instantly and booking demos.
              </p>
              <a href="#" class="text-blue-600 font-semibold hover:underline"
                >Start Free Forever →</a>
            </div>
          </div>
        </section>

       
        <section id="marketing">
          <div class="mb-6">
            <h2 class="text-2xl font-extrabold text-yellow-700">
              Marketing Department
            </h2>
            <p class="text-gray-500">
              Run better campaigns, track success, and optimize effortlessly.
            </p>
          </div>
          <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div
              class="bg-white border border-yellow-200 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 relative overflow-hidden"
            >
              <div
                class="absolute -top-4 -right-4 w-20 h-20 bg-yellow-100 rounded-full opacity-30"
              ></div>
              <h3 class="text-xl font-bold text-yellow-700 mb-1">
                📊 Agentic CampaignView
              </h3>
              <p class="text-gray-600 mb-4">
                Tracks ad ROI and highlights your top-performing campaigns.
              </p>
              <a href="#" class="text-yellow-600 font-semibold hover:underline"
                >Start Free Forever →</a>
            </div>
          </div>
        </section>

     
        <section id="operations">
          <div class="mb-6">
            <h2 class="text-2xl font-extrabold text-green-700">
              Operations Department
            </h2>
            <p class="text-gray-500">
              Ensure meeting actions and processes are handled automatically.
            </p>
          </div>
          <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div
              class="bg-white border border-green-200 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 relative overflow-hidden"
            >
              <div
                class="absolute -top-4 -right-4 w-20 h-20 bg-green-100 rounded-full opacity-30"
              ></div>
              <h3 class="text-xl font-bold text-green-700 mb-1">
                📝 Agentic NoteTaker
              </h3>
              <p class="text-gray-600 mb-4">
                Ensures follow-ups post-meeting with smart summaries and
                actions.
              </p>
              <a href="#" class="text-green-600 font-semibold hover:underline"
                >Start Free Forever →</a>
            </div>
          </div>
        </section>

       
        <section id="hr">
          <div class="mb-6">
            <h2 class="text-2xl font-extrabold text-purple-700">
              HR Department
            </h2>
            <p class="text-gray-500">
              Simplify hiring with automation and interview scheduling.
            </p>
          </div>
          <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div
              class="bg-white border border-purple-200 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 relative overflow-hidden"
            >
              <div
                class="absolute -top-4 -right-4 w-20 h-20 bg-purple-100 rounded-full opacity-30"
              ></div>
              <h3 class="text-xl font-bold text-purple-700 mb-1">
                👥 Agentic HireBot
              </h3>
              <p class="text-gray-600 mb-4">
                Filters resumes and schedules interviews — without human delay.
              </p>
              <a href="#" class="text-purple-600 font-semibold hover:underline"
                >Start Free Forever →</a>
            </div>
          </div>
        </section>

       
        <section id="clientsuccess">
          <div class="mb-6">
            <h2 class="text-2xl font-extrabold text-pink-700">
              Client Success
            </h2>
            <p class="text-gray-500">
              Keep clients engaged with automated onboarding and follow-ups.
            </p>
          </div>
          <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div
              class="bg-white border border-pink-200 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 relative overflow-hidden"
            >
              <div
                class="absolute -top-4 -right-4 w-20 h-20 bg-pink-100 rounded-full opacity-30"
              ></div>
              <h3 class="text-xl font-bold text-pink-700 mb-1">
                🤝 Agentic ClientMate
              </h3>
              <p class="text-gray-600 mb-4">
                Automates onboarding emails, document requests, and reminders.
              </p>
              <a href="#" class="text-pink-600 font-semibold hover:underline"
                >Start Free Forever →</a>
            </div>
          </div>
        </section>

        
        <section id="finance">
          <div class="mb-6">
            <h2 class="text-2xl font-extrabold text-gray-800">Finance</h2>
            <p class="text-gray-500">
              Real-time insights into cash flow and financial performance.
            </p>
          </div>
          <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div
              class="bg-white border border-gray-300 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 relative overflow-hidden"
            >
              <div
                class="absolute -top-4 -right-4 w-20 h-20 bg-gray-100 rounded-full opacity-30"
              ></div>
              <h3 class="text-xl font-bold text-gray-800 mb-1">
                💰 Agentic CashView
              </h3>
              <p class="text-gray-600 mb-4">
                Gives a real-time snapshot of your company’s financial health.
              </p>
              <a href="#" class="text-gray-800 font-semibold hover:underline"
                >Start Free Forever →</a>
            </div>
          </div>
        </section>
      </main>
    </div>
        
        </>
    )
}

export default Product