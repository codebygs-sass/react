import React from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';


const Dashboard = () => {

    return(
        <>
<div class="bg-gradient-to-br from-brand-50/70 via-white to-brand-100/40 text-slate-800">

  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
  
  <Sidebar/>

   
    <main class="flex flex-col min-h-screen">

      <header class="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div class="px-4 lg:px-8 py-3 flex items-center gap-3">
       
          <details class="lg:hidden mr-1">
            <summary class="list-none cursor-pointer p-2 rounded-lg hover:bg-brand-50 text-brand-700" title="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>
            </summary>
            <div class="absolute left-3 right-3 mt-2 rounded-xl border border-slate-200 bg-white shadow-soft p-3">
              <a class="block px-3 py-2 rounded-lg hover:bg-brand-50" href="02-dashboard.html">Dashboard</a>
              <a class="block px-3 py-2 rounded-lg hover:bg-brand-50" href="03-record.html">Record</a>
              <a class="block px-3 py-2 rounded-lg hover:bg-brand-50" href="05-search.html">Search</a>
              <a class="block px-3 py-2 rounded-lg hover:bg-brand-50" href="06-uploads.html">Uploads</a>
              <a class="block px-3 py-2 rounded-lg hover:bg-brand-50" href="07-settings.html">Settings</a>
            </div>
          </details>

        
          <div class="flex-1">
            <label class="relative block">
              <span class="sr-only">Search recordings</span>
              <input type="text" placeholder="Search recordings, speakers, keywords…" class="w-full rounded-xl border border-slate-200 bg-white/80 px-11 py-2.5 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-200" />
              <span class="absolute inset-y-0 left-3 grid place-items-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 2a8 8 0 1 0 4.9 14.32l4.39 4.39 1.41-1.41-4.39-4.39A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z"/></svg>
              </span>
            </label>
          </div>

          <a href="03-record.html" class="hidden sm:inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-4 py-2 font-medium shadow-soft hover:bg-brand-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm-7-3a7 7 0 0 0 14 0h-2a5 5 0 1 1-10 0H5z"/></svg>
            New recording
          </a>

          <button class="ml-1 p-2 rounded-lg hover:bg-brand-50" title="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brand-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
          </button>
          <a href="07-settings.html" class="ml-1 inline-flex items-center gap-2 p-1.5 rounded-full border border-slate-200 hover:bg-brand-50">
            <img alt="avatar" src="https://i.pravatar.cc/40?img=5" class="h-8 w-8 rounded-full" />
            <span class="hidden md:block text-sm pr-2">You</span>
          </a>
        </div>
      </header>

      
      <section class="flex-1 px-4 lg:px-8 py-6 space-y-6">
       
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 class="text-2xl md:text-3xl font-semibold text-slate-900">Welcome back 👋</h1>
            <p class="text-slate-600">Your recent recordings, usage, and quick actions are below.</p>
          </div>
          <div class="flex items-center gap-2">
            <a href="06-uploads.html" class="inline-flex items-center gap-2 rounded-xl border border-brand-200 text-brand-700 bg-brand-50 px-4 py-2 font-medium hover:bg-brand-100">Upload files</a>
            <a href="03-record.html" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-4 py-2 font-medium shadow-soft hover:bg-brand-700">Start recording</a>
          </div>
        </div>

        
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div class="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-soft">
            <div class="text-sm text-slate-500">Minutes transcribed</div>
            <div class="mt-2 flex items-baseline gap-2"><span class="text-3xl font-semibold text-slate-900">1,248</span><span class="text-xs text-slate-500">this month</span></div>
            <div class="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden"><div class="h-full w-3/5 bg-brand-600"></div></div>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-soft">
            <div class="text-sm text-slate-500">Recordings</div>
            <div class="mt-2 flex items-baseline gap-2"><span class="text-3xl font-semibold text-slate-900">86</span><span class="text-xs text-slate-500">total</span></div>
            <div class="mt-4 text-xs text-slate-500">+7 this week</div>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-soft">
            <div class="text-sm text-slate-500">Storage used</div>
            <div class="mt-2 flex items-baseline gap-2"><span class="text-3xl font-semibold text-slate-900">7.4 GB</span><span class="text-xs text-slate-500">/ 20 GB</span></div>
            <div class="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden"><div class="h-full w-[37%] bg-brand-600"></div></div>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-soft">
            <div class="text-sm text-slate-500">Average accuracy</div>
            <div class="mt-2 flex items-baseline gap-2"><span class="text-3xl font-semibold text-slate-900">94.3%</span><span class="text-xs text-slate-500">last 30 days</span></div>
            <div class="mt-4 text-xs text-slate-500">Improve with custom vocabulary</div>
          </div>
        </div>

        
        <div class="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-soft">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-sm text-slate-600">Quick filters:</span>
              <a href="#" class="px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm border border-brand-200">This week</a>
              <a href="#" class="px-3 py-1.5 rounded-full bg-white text-slate-700 text-sm border">Last 30 days</a>
              <a href="#" class="px-3 py-1.5 rounded-full bg-white text-slate-700 text-sm border">Starred</a>
              <a href="#" class="px-3 py-1.5 rounded-full bg-white text-slate-700 text-sm border">Shared with me</a>
              <a href="#" class="px-3 py-1.5 rounded-full bg-white text-slate-700 text-sm border">High confidence</a>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm text-slate-600">Sort by</label>
              <select class="rounded-xl border border-slate-200 bg-white/80 px-3 py-1.5 text-sm">
                <option>Newest</option>
                <option>Oldest</option>
                <option>Duration</option>
                <option>Title A→Z</option>
              </select>
              <a href="05-search.html" class="px-3 py-1.5 rounded-xl border border-brand-200 text-brand-700 bg-brand-50 text-sm">Open advanced search</a>
            </div>
          </div>
        </div>

   
        <div class="rounded-2xl border border-slate-200 bg-white/80 shadow-soft overflow-hidden">
          <div class="px-4 py-3 flex items-center justify-between border-b">
            <h2 class="font-semibold">Recent recordings</h2>
            <a href="03-record.html" class="text-sm text-brand-700 hover:underline">Start new →</a>
          </div>
          <div class="overflow-x-auto scroll-slim">
            <table class="min-w-full text-sm">
              <thead class="bg-brand-50/60 text-slate-600">
                <tr>
                  <th class="text-left font-medium px-4 py-3">Title</th>
                  <th class="text-left font-medium px-4 py-3">Date</th>
                  <th class="text-left font-medium px-4 py-3">Duration</th>
                  <th class="text-left font-medium px-4 py-3">Speakers</th>
                  <th class="text-left font-medium px-4 py-3">Status</th>
                  <th class="text-right font-medium px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr class="hover:bg-brand-50/30">
                  <td class="px-4 py-3">
                    <a class="font-medium text-slate-900 hover:underline" href="04-transcript.html?id=mtg-240824">Sprint Planning – Aug 24</a>
                    <div class="text-xs text-slate-500">Keywords: release, blockers, estimates</div>
                  </td>
                  <td class="px-4 py-3 text-slate-700">24 Aug 2025</td>
                  <td class="px-4 py-3 text-slate-700">48:12</td>
                  <td class="px-4 py-3 text-slate-700">5</td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Completed</span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <div class="inline-flex gap-2">
                      <a href="04-transcript.html?id=mtg-240824" class="px-3 py-1.5 rounded-lg border">View</a>
                      <a href="#" class="px-3 py-1.5 rounded-lg border">Share</a>
                      <a href="#" class="px-3 py-1.5 rounded-lg border">Export</a>
                    </div>
                  </td>
                </tr>
                <tr class="hover:bg-brand-50/30">
                  <td class="px-4 py-3">
                    <a class="font-medium text-slate-900 hover:underline" href="04-transcript.html?id=demo-yt">YouTube Demo Voiceover</a>
                    <div class="text-xs text-slate-500">Keywords: script, timeline, CTA</div>
                  </td>
                  <td class="px-4 py-3 text-slate-700">23 Aug 2025</td>
                  <td class="px-4 py-3 text-slate-700">12:06</td>
                  <td class="px-4 py-3 text-slate-700">1</td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Reviewing</span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <div class="inline-flex gap-2">
                      <a href="04-transcript.html?id=demo-yt" class="px-3 py-1.5 rounded-lg border">View</a>
                      <a href="#" class="px-3 py-1.5 rounded-lg border">Share</a>
                      <a href="#" class="px-3 py-1.5 rounded-lg border">Export</a>
                    </div>
                  </td>
                </tr>
                <tr class="hover:bg-brand-50/30">
                  <td class="px-4 py-3">
                    <a class="font-medium text-slate-900 hover:underline" href="04-transcript.html?id=standup-58">Daily Standup #58</a>
                    <div class="text-xs text-slate-500">Keywords: blockers, progress</div>
                  </td>
                  <td class="px-4 py-3 text-slate-700">22 Aug 2025</td>
                  <td class="px-4 py-3 text-slate-700">09:31</td>
                  <td class="px-4 py-3 text-slate-700">6</td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Completed</span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <div class="inline-flex gap-2">
                      <a href="04-transcript.html?id=standup-58" class="px-3 py-1.5 rounded-lg border">View</a>
                      <a href="#" class="px-3 py-1.5 rounded-lg border">Share</a>
                      <a href="#" class="px-3 py-1.5 rounded-lg border">Export</a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
      
          <div class="xl:col-span-2 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-soft">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold">Tips to get more from Voice Notes</h3>
              <a href="15-help.html" class="text-sm text-brand-700 hover:underline">See all tips</a>
            </div>
            <div class="flex gap-3 overflow-x-auto scroll-slim snap-x">
              <article class="min-w-[260px] snap-start rounded-xl border p-4 bg-gradient-to-br from-white via-white to-brand-50">
                <div class="text-sm font-medium">⭐ Star important recordings</div>
                <p class="text-xs text-slate-600 mt-1">Use the star in transcript view to find notes faster.</p>
                <a class="inline-block mt-3 text-xs text-brand-700 underline" href="04-transcript.html">Open a transcript →</a>
              </article>
              <article class="min-w-[260px] snap-start rounded-xl border p-4 bg-gradient-to-br from-white via-white to-brand-50">
                <div class="text-sm font-medium">📚 Custom vocabulary</div>
                <p class="text-xs text-slate-600 mt-1">Add your domain terms for better accuracy.</p>
                <a class="inline-block mt-3 text-xs text-brand-700 underline" href="07-settings.html">Manage vocabulary →</a>
              </article>
              <article class="min-w-[260px] snap-start rounded-xl border p-4 bg-gradient-to-br from-white via-white to-brand-50">
                <div class="text-sm font-medium">🤝 Share with teammates</div>
                <p class="text-xs text-slate-600 mt-1">Invite your team and collaborate in real time.</p>
                <a class="inline-block mt-3 text-xs text-brand-700 underline" href="09-team.html">Open team →</a>
              </article>
            </div>
          </div>

        
          <div class="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-soft">
            <h3 class="font-semibold">Usage & quota</h3>
            <div class="mt-3">
              <div class="flex items-center justify-between text-sm">
                <span class="text-slate-600">Transcription minutes</span>
                <span class="font-medium">382 / 600</span>
              </div>
              <div class="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden"><div class="h-full w-[64%] bg-brand-600"></div></div>
              <div class="mt-3 text-xs text-slate-500">Resets on 01 Sep 2025</div>
            </div>
            <div class="mt-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-slate-600">Storage</span>
                <span class="font-medium">7.4 GB / 20 GB</span>
              </div>
              <div class="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden"><div class="h-full w-[37%] bg-brand-600"></div></div>
            </div>
            <a href="08-billing.html" class="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3 py-2 text-sm font-medium hover:bg-brand-700">Upgrade plan</a>
          </div>
        </div>

        
        <template id="empty-state">
          <div class="rounded-2xl border border-dashed border-brand-300 bg-brand-50/60 p-8 text-center">
            <div class="mx-auto h-12 w-12 rounded-xl bg-brand-600 text-white grid place-items-center">🎤</div>
            <h3 class="mt-4 text-lg font-semibold text-slate-900">No recordings yet</h3>
            <p class="text-slate-600">Create your first recording or upload audio to get started.</p>
            <div class="mt-4 flex items-center justify-center gap-2">
              <a href="03-record.html" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-4 py-2 font-medium hover:bg-brand-700">Start recording</a>
              <a href="06-uploads.html" class="inline-flex items-center gap-2 rounded-xl border border-brand-200 text-brand-700 bg-brand-50 px-4 py-2 font-medium">Upload files</a>
            </div>
          </div>
        </template>
      </section>

    
    <Footer/>
    </main>
  </div>
</div>

        </>
    )

}

export default Dashboard;