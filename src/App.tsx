import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  UtensilsCrossed, 
  CalendarDays, 
  Image as ImageIcon, 
  User, 
  ChevronRight, 
  Plus, 
  Info, 
  Leaf, 
  Flame,
  Bell,
  MapPin,
  Clock,
  Users,
  Sparkles
} from 'lucide-react';
import { DISHES, GALLERY_IMAGES } from './constants';

type Tab = 'home' | 'menu' | 'book' | 'gallery' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen onNavigate={(tab) => setActiveTab(tab)} />;
      case 'menu': return <MenuScreen />;
      case 'book': return <BookScreen />;
      case 'gallery': return <GalleryScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-white selection:bg-gold selection:text-charcoal font-sans">
      {/* Desktop Top Nav */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-12 py-5 hidden md:flex items-center justify-between transition-all duration-500 ${scrolled ? 'glass border-b border-white/5' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <img src="https://i.postimg.cc/RCRF7vPq/Ayani-logo.jpg" alt="Ayini" className="h-10 object-contain" />
        </div>
        <div className="flex items-center gap-10 font-serif tracking-[0.2em] uppercase text-xs">
          {(['home', 'menu', 'gallery'] as const).map((item) => (
            <button 
              key={item} 
              onClick={() => setActiveTab(item)}
              className={`hover:text-gold transition-colors cursor-pointer ${activeTab === item ? 'text-gold' : 'text-white/60'}`}
            >
              {item}
            </button>
          ))}
          <button className="text-white/60 hover:text-gold transition-colors cursor-pointer">Our Story</button>
          <button className="text-white/60 hover:text-gold transition-colors cursor-pointer">Contact</button>
        </div>
        <button 
          onClick={() => setActiveTab('book')}
          className="bg-gold-dark text-charcoal px-8 py-2.5 rounded-full font-serif tracking-widest text-xs uppercase hover:bg-gold transition-all transform hover:scale-105 active:scale-95"
        >
          Book a Table
        </button>
      </nav>

      {/* Mobile Top Bar */}
      <header className="md:hidden glass fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <img src="https://i.postimg.cc/RCRF7vPq/Ayani-logo.jpg" alt="Ayini" className="h-8 object-contain" />
        </div>
        <button className="relative p-2 text-white/80">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full" />
        </button>
      </header>

      {/* Content Area */}
      <main className="pb-24 md:pb-0 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden glass fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 rounded-t-3xl border-t border-white/5">
        <NavButton icon={<HomeIcon size={20} />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavButton icon={<UtensilsCrossed size={20} />} label="Menu" active={activeTab === 'menu'} onClick={() => setActiveTab('menu')} />
        <NavButton icon={<CalendarDays size={20} />} label="Book" active={activeTab === 'book'} onClick={() => setActiveTab('book')} />
        <NavButton icon={<ImageIcon size={20} />} label="Gallery" active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} />
        <NavButton icon={<User size={20} />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </nav>

      {/* Desktop Footer */}
      <footer className="hidden md:flex flex-col items-center py-20 bg-charcoal-light/10 border-t border-white/5">
        <img src="https://i.postimg.cc/RCRF7vPq/Ayani-logo.jpg" alt="Ayini" className="h-12 object-contain mb-8" />
        <div className="flex gap-10 font-serif tracking-[0.2em] uppercase text-[10px] text-white/40 mb-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Sustainability</a>
          <a href="#" className="hover:text-white transition-colors">Press</a>
        </div>
        <div className="font-serif tracking-widest text-[10px] text-white/20">
          © 2024 AYINI RESTAURANT. CULINARY HERITAGE DEFINED.
        </div>
      </footer>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? 'text-gold scale-110' : 'text-white/40 hover:text-white'}`}
    >
      {icon}
      <span className="text-[10px] font-medium tracking-wider uppercase">{label}</span>
    </button>
  );
}

/* --- SCREENS --- */

function HomeScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <div className="pt-24 md:pt-40 px-6 md:px-12 max-w-7xl mx-auto">
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <p className="font-serif tracking-[0.3em] text-gold text-xs uppercase mb-4">Welcome Back</p>
        <h2 className="font-serif text-5xl md:text-7xl mb-12 tracking-tight">Explore Culinary <br className="hidden md:block" /> Heritage</h2>

        {/* Hero Carousel Area */}
        <div className="w-full flex overflow-x-auto snap-x snap-mandatory gap-6 hide-scrollbar py-4 -mx-6 px-6 md:mx-0 md:px-0">
          <div className="snap-center shrink-0 w-[85vw] md:w-[700px] h-[450px] rounded-2xl relative overflow-hidden group shadow-2xl">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvnjaHumnJv3SLiGkRqGz66FhUZq_nfjTX_pFzxA4FwcVufCrm9JS4xdMqmIRVT3ne0MmoSEL_geKMM7Jl1t7N_RcrzOsG6MgoOi119JDZMhhQJKZF6P2nASs7j53PO_hmvdiUCPnp3cjCFWB32NGsW5xL2IgbT0A2_BZyKNDa_q_NOFVirPbqqZpGVTjalMplWjKr75WeudGHBiESCAj3ZOWZ2wBlxzm8sDv1K5IOW2UUHflbfUpRElUmCGDmeEGXMeB2qAqeH9iq" alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <span className="inline-block px-3 py-1 mb-4 rounded-full border border-gold/30 text-gold font-sans text-[10px] uppercase tracking-widest">Chef's Special</span>
              <h3 className="font-serif text-3xl md:text-4xl mb-4">Saffron Infused Biryani</h3>
              <p className="text-white/60 text-sm md:text-base max-w-md mb-8">Slow-cooked overnight with heritage spices and premium cuts.</p>
              <button 
                onClick={() => onNavigate('book')}
                className="bg-gold text-charcoal px-8 py-3 rounded-full font-sans font-semibold text-xs tracking-widest uppercase flex items-center gap-2 hover:bg-white transition-all transform hover:translate-x-2"
              >
                Book Table <ChevronRight size={14} />
              </button>
            </div>
          </div>
          
          <div className="snap-center shrink-0 w-[85vw] md:w-[700px] h-[450px] rounded-2xl relative overflow-hidden group shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRR71jZ975kCu5A9u1viFjdomP9-_V4A3UJolAyNwL4dm83QXLBEEdDJq5aEMaz9rNL5LuVKKkWNtY9b4yA_L-diiMcjxtS5yALs0cyLKQ_sqhEwhbtW5o8LHJoddD6ivT9do6lREZvW3YQaDrTzyQaa-5jtMJ2j3j5UvVRKcCdjjSPe5N8RC9dwn54t6J5GUh3w32VXsc564qiP_hVVEtYACcX86iRsZ6LNvaaoO32KLwVF8BBnciTYzxysehuy832M4BSAcKODZ4" alt="Featured 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <span className="inline-block px-3 py-1 mb-4 rounded-full border border-gold/30 text-gold font-sans text-[10px] uppercase tracking-widest">Signature</span>
              <h3 className="font-serif text-3xl md:text-4xl mb-4">Tandoor Lamb Chops</h3>
              <p className="text-white/60 text-sm md:text-base max-w-md">Marinated in aged yogurt and rare mountain herbs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 mb-32">
        <div className="flex items-end justify-between mb-12">
          <h3 className="font-serif text-4xl tracking-tight">Curated Menus</h3>
          <button 
            onClick={() => onNavigate('menu')}
            className="text-gold font-sans text-xs uppercase tracking-[0.2em] hover:tracking-[0.3em] transition-all flex items-center gap-2"
          >
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div 
            onClick={() => onNavigate('menu')}
            className="col-span-1 aspect-[4/5] rounded-2xl relative overflow-hidden group cursor-pointer shadow-xl"
          >
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHRv60HXIy6oRJLQfTrHb3Qym7QTsKVlOo5coGBai7wyWRFipc-9VY5KoZobRYtPdlNoY_WqDEKCt3jq9zTm5d7quLWmsSuuh4bguGh9lIRAyQpte84kpK4Gxha4SpnOrM15BNkv0v07fcdBQovy4DMBnuXJNbYCD0AY4UxILopBQVVtnCes32UWZCTGAKMlNu9iG1xZlWQ_bohdCr2ExmMeybDmcbM_CrxLSYZTDCsXSlEXdBFdngrLZJPHrDrDgusmmPKg0Lv2dd" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Veg" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-0 left-0 p-6 flex flex-col items-start gap-2">
              <Leaf size={20} className="text-gold" />
              <span className="font-serif text-xl">Vegetarian</span>
            </div>
          </div>
          <div 
            onClick={() => onNavigate('menu')}
            className="col-span-1 aspect-[4/5] rounded-2xl relative overflow-hidden group cursor-pointer shadow-xl"
          >
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAojBwRo5LPDrJk2XPN2gf9cZY74ZI_wQmBelj338cjDs7mCppDDYz_TAOMDryB_i-1uM_o1jj1QLi3YIeOgAPM8JderA3K8t4tgdgoSdnKQmgV2YW8yqtM9-xtzgkDOk0vqjGHcPMCm4oHTfEH7j6_rqFU2BwANeJKqPMexYnID5qDwEWYN5yJtkWuDxhFF78YIzDUlQVNRdaZCCMIidvP4DDge0Hn1j3E97Mpls--KyNEMJnDDLH3r3fBB5CKPO5O-LvRe1M39k5Q" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Meat" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-0 left-0 p-6 flex flex-col items-start gap-2">
              <Flame size={20} className="text-gold" />
              <span className="font-serif text-xl">Heritage Meats</span>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 glass shadow-xl rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center border border-white/5">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={120} className="text-gold" />
            </div>
            <div className="relative z-10 flex flex-col gap-2">
              <span className="font-sans text-xs text-gold uppercase tracking-[0.3em] font-semibold">Exclusive Offer</span>
              <h4 className="font-serif text-3xl mb-2">Tasting Menu Experience</h4>
              <p className="text-white/50 text-sm max-w-xs leading-relaxed">Reserve for two and receive a complimentary pairing selected by our sommelier.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MenuScreen() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Signature', 'Vegetarian', 'Heritage Meats'] as const;
  const filteredDishes = filter === 'All' ? DISHES : DISHES.filter(d => d.category === filter);

  return (
    <div className="pt-24 md:pt-40 px-6 md:px-12 max-w-7xl mx-auto pb-32">
      <header className="mb-16 text-center">
        <h2 className="font-serif text-5xl md:text-7xl mb-4 tracking-tighter">Culinary Excellence</h2>
        <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">Experience the intersection of ancient heritage and ultra-modern luxury.</p>
      </header>
      
      <div className="flex gap-4 mb-16 overflow-x-auto hide-scrollbar justify-start md:justify-center">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-full text-xs font-sans tracking-[0.2em] uppercase transition-all whitespace-nowrap border ${filter === cat ? 'bg-gold border-gold text-charcoal' : 'glass text-white/60 hover:border-gold/30'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDishes.map((dish, i) => (
          <motion.article 
            key={dish.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl overflow-hidden group flex flex-col hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="h-64 relative overflow-hidden">
              <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4 gap-4">
                <h3 className="font-serif text-2xl tracking-tight leading-tight">{dish.name}</h3>
                <span className="font-sans text-gold whitespace-nowrap mt-1">{dish.price}</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow">{dish.description}</p>
              <div className="flex gap-3">
                <button className="flex-1 bg-gold text-charcoal rounded-xl py-3 text-[10px] font-sans font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white transition-colors">
                  <Plus size={14} /> Add to Order
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl glass border border-white/5 text-white/40 hover:text-gold transition-colors">
                  <Info size={18} />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function BookScreen() {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 pt-24 pb-32">
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0ezplN98omUY1H_QrXt1ETXLxnsEgM1LhebFctF3U-_F5DutHeYnfEYjDnplCWiG58WtrYR17OfhAUwI99V6iaHdr3olrh2_L85Bdu0ImxUWrThrhNFxNxeeRL0qJiI4VKAr1L42N6ZP0ZtrS-T1zi4NM648UT7mA_RAhcvjtvYlglb44HEWNfQVkq2r0k3QrHglR8LttHfupkgIkKjRcHHS0FSOeopFnJSGoDL27XrspkiSI5qHjpztLrHjQBKBSfNPZE3vy5K7Q" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-4xl glass p-10 md:p-16 rounded-3xl border border-white/5 shadow-2xl"
      >
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl mb-6 tracking-tighter">Reserve a Table</h2>
          <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto leading-relaxed italic">"Secure your place for an unforgettable evening of modern luxury."</p>
        </div>

        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <InputField label="Full Name" placeholder="e.g. Eleanor Vance" />
            <InputField label="Phone Number" placeholder="+1 (555) 000-0000" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <InputField label="Date" type="date" icon={<CalendarDays size={18} className="text-gold" />} />
            <InputField label="Time" type="time" icon={<Clock size={18} className="text-gold" />} />
            <div className="flex flex-col gap-4">
              <label className="text-[10px] uppercase font-sans tracking-[0.3em] font-semibold text-white/40">Guests</label>
              <div className="relative group">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gold group-focus-within:text-white transition-colors" size={18} />
                <select className="w-full bg-white/5 border-b border-gold/30 p-4 pl-12 text-sm focus:outline-none focus:border-gold transition-all appearance-none cursor-pointer">
                  <option className="bg-charcoal">2 People</option>
                  <option className="bg-charcoal">4 People</option>
                  <option className="bg-charcoal">6 People</option>
                  <option className="bg-charcoal">Large Group</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-4">
              <label className="text-[10px] uppercase font-sans tracking-[0.3em] font-semibold text-white/40">Location Preference</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gold transition-colors" size={18} />
                <select className="w-full bg-white/5 border-b border-gold/30 p-4 pl-12 text-sm focus:outline-none focus:border-gold transition-all appearance-none cursor-pointer">
                  <option className="bg-charcoal">Main Dining Room</option>
                  <option className="bg-charcoal">Chef's Table</option>
                  <option className="bg-charcoal">Outdoor Terrace</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-[10px] uppercase font-sans tracking-[0.3em] font-semibold text-white/40">Occasion</label>
              <div className="relative group">
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-gold transition-colors" size={18} />
                <select className="w-full bg-white/5 border-b border-gold/30 p-4 pl-12 text-sm focus:outline-none focus:border-gold transition-all appearance-none cursor-pointer">
                  <option className="bg-charcoal">Normal Dining</option>
                  <option className="bg-charcoal">Birthday</option>
                  <option className="bg-charcoal">Anniversary</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-10 flex justify-center">
            <button className="bg-gold text-charcoal px-16 py-5 font-sans font-bold text-xs uppercase tracking-[0.3em] shadow-xl hover:shadow-gold/20 transition-all transform hover:-translate-y-1 active:scale-95">
              Reserve Now
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function InputField({ label, placeholder, type = "text", icon }: any) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-[10px] uppercase font-sans tracking-[0.3em] font-semibold text-white/40">{label}</label>
      <div className="relative group">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>}
        <input 
          type={type} 
          placeholder={placeholder}
          className={`w-full bg-white/5 border-b border-gold/30 p-4 ${icon ? 'pl-12' : 'px-4'} text-sm focus:outline-none focus:border-gold transition-all placeholder:text-white/10`}
        />
      </div>
    </div>
  );
}

function GalleryScreen() {
  return (
    <div className="pt-24 md:pt-40 px-6 md:px-12 max-w-7xl mx-auto pb-32">
      <header className="mb-16 text-center">
        <h2 className="font-serif text-5xl md:text-8xl mb-6 tracking-tighter text-gold">Gallery</h2>
        <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto leading-relaxed italic">"Visual narrative of Ayini defined."</p>
      </header>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {GALLERY_IMAGES.map((img, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-xl"
          >
            <img src={img} className="w-full grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105" alt={`Art ${i}`} />
            <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Plus className="text-white" size={48} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="pt-32 md:pt-48 px-6 md:px-12 max-w-lg mx-auto pb-32 text-center">
      <div className="w-24 h-24 rounded-full glass border border-gold/20 mx-auto mb-8 flex items-center justify-center">
        <User size={40} className="text-gold" />
      </div>
      <h2 className="font-serif text-3xl mb-1">Eleanor Vance</h2>
      <p className="text-gold font-sans text-[10px] uppercase tracking-[0.4em] mb-12">Heritage Member</p>

      <div className="glass rounded-2xl p-4 flex flex-col gap-2 text-left mb-12">
        <ProfileItem icon={<CalendarDays size={18} />} label="Reservations" />
        <ProfileItem icon={<Bell size={18} />} label="Preferences" />
        <ProfileItem icon={<User size={18} />} label="Account" />
      </div>

      <button className="text-white/20 hover:text-white text-[10px] uppercase tracking-[0.5em] transition-colors">Logout</button>
    </div>
  );
}

function ProfileItem({ icon, label }: any) {
  return (
    <button className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors group">
      <div className="flex items-center gap-4 text-white/60 group-hover:text-gold transition-colors">
        {icon}
        <span className="text-sm font-sans tracking-wide">{label}</span>
      </div>
      <ChevronRight size={14} className="text-white/10 group-hover:text-gold" />
    </button>
  );
}
