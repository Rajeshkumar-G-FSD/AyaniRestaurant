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

type Tab = 'home' | 'menu' | 'events' | 'book' | 'gallery' | 'story' | 'contact' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = (tab: Tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen onNavigate={(tab) => setActiveTab(tab)} />;
      case 'menu': return <MenuScreen />;
      case 'events': return <EventsScreen />;
      case 'book': return <BookScreen />;
      case 'gallery': return <GalleryScreen />;
      case 'story': return <StoryScreen />;
      case 'contact': return <ContactScreen />;
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
        <div className="flex items-center gap-8 font-serif tracking-[0.2em] uppercase text-[10px] xl:text-xs">
          {(['home', 'menu', 'events', 'gallery', 'story', 'contact'] as const).map((item) => (
            <button 
              key={item} 
              onClick={() => setActiveTab(item)}
              className={`hover:text-gold transition-all cursor-pointer relative group ${activeTab === item ? 'text-gold' : 'text-white/60'}`}
            >
              {item.replace('story', 'Our Story')}
              <span className={`absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full ${activeTab === item ? 'w-full' : ''}`} />
            </button>
          ))}
        </div>
        <button 
          onClick={() => setActiveTab('book')}
          className="bg-gold-dark text-charcoal px-8 py-2.5 rounded-full font-serif tracking-widest text-xs uppercase hover:bg-gold transition-all transform hover:scale-105 active:scale-95"
        >
          Book a Table
        </button>
      </nav>

      {/* Mobile Top Bar */}
      <header className="md:hidden glass fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <img src="https://i.postimg.cc/RCRF7vPq/Ayani-logo.jpg" alt="Ayini" className="h-8 object-contain" />
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-white/80">
            <Bell size={20} />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gold transition-transform active:scale-90"
          >
            {mobileMenuOpen ? <Plus className="rotate-45" size={24} /> : (
              <div className="flex flex-col gap-1.5 w-6">
                <div className="h-0.5 w-full bg-current rounded-full" />
                <div className="h-0.5 w-2/3 bg-current rounded-full self-end" />
                <div className="h-0.5 w-full bg-current rounded-full" />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Full Screen Menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] glass flex flex-col p-8 pt-24"
          >
            <div className="flex flex-col gap-8 items-center text-center">
              {(['home', 'menu', 'events', 'gallery', 'story', 'contact'] as const).map((item) => (
                <button 
                  key={item}
                  onClick={() => closeMenu(item)}
                  className={`font-serif text-3xl tracking-tight transition-colors ${activeTab === item ? 'text-gold' : 'text-white/60'}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1).replace('story', ' Story')}
                </button>
              ))}
              <div className="w-12 h-px bg-gold/20 my-4" />
              <button 
                onClick={() => closeMenu('book')}
                className="bg-gold text-charcoal px-12 py-4 rounded-full font-serif tracking-widest text-sm uppercase"
              >
                Book a Table
              </button>
            </div>
            
            <div className="mt-auto pb-12 flex justify-center gap-8 text-white/20">
              <User size={24} onClick={() => closeMenu('profile')} />
              <Bell size={24} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
        <NavButton icon={<CalendarDays size={20} />} label="Events" active={activeTab === 'events'} onClick={() => setActiveTab('events')} />
        <NavButton icon={<ImageIcon size={20} />} label="Gallery" active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} />
        <NavButton icon={<User size={20} />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </nav>

      {/* Desktop Footer */}
      <footer className="hidden md:flex flex-col items-center py-20 bg-charcoal-light/10 border-t border-white/5">
        <img src="https://i.postimg.cc/RCRF7vPq/Ayani-logo.jpg" alt="Ayini" className="h-12 object-contain mb-8" />
        <div className="flex gap-10 font-serif tracking-[0.2em] uppercase text-[10px] text-white/40 mb-8">
          <a href="#" className="hover:text-white transition-colors" onClick={() => setActiveTab('story')}>Our Story</a>
          <a href="#" className="hover:text-white transition-colors" onClick={() => setActiveTab('contact')}>Contact</a>
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

function InputField({ label, placeholder, type = "text", icon, onChange }: any) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-[10px] uppercase font-sans tracking-[0.3em] font-semibold text-white/40">{label}</label>
      <div className="relative group">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>}
        <input 
          type={type} 
          placeholder={placeholder}
          onChange={onChange}
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

function EventsScreen() {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    type: '',
    name: '',
    phone: '',
    purpose: '',
    location: 'Main Hall',
    date: '',
    slot: 'Lunch (12:00 PM - 3:00 PM)'
  });

  const eventTypes = [
    { title: 'Birthday Party', icon: <Plus size={24} className="rotate-45" />, desc: 'Celebrate your special day with a curated heritage menu.' },
    { title: 'Office Meeting', icon: <Users size={24} />, desc: 'Sophisticated settings for professional discussions.' },
    { title: 'Family Gathering', icon: <HomeIcon size={24} />, desc: 'Intimate spaces for multi-generational traditions.' }
  ];

  return (
    <div className="pt-32 pb-32 px-6 max-w-4xl mx-auto">
      <header className="text-center mb-16">
        <h2 className="font-serif text-5xl md:text-6xl mb-6">Signature Events</h2>
        <p className="text-white/40 tracking-widest uppercase text-[10px]">Step {step} of 2: {step === 1 ? 'Personal Details' : 'Event Selection'}</p>
      </header>

      <div className="glass p-8 md:p-12 rounded-3xl border border-white/5 space-y-12">
        {step === 1 ? (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputField label="Full Name" placeholder="Eleanor Vance" onChange={(e: any) => setEventData({...eventData, name: e.target.value})} />
              <InputField label="Phone Number" placeholder="+1 (555) 000-0000" onChange={(e: any) => setEventData({...eventData, phone: e.target.value})} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <label className="text-[10px] uppercase font-sans tracking-[0.3em] font-semibold text-white/40">Preferred Location</label>
                <select 
                  className="w-full bg-white/5 border-b border-gold/30 p-4 text-sm focus:outline-none focus:border-gold transition-all"
                  onChange={(e) => setEventData({...eventData, location: e.target.value})}
                >
                  <option value="Main Hall">Grand Heritage Hall</option>
                  <option value="Terrace">Skyline Terrace</option>
                  <option value="Private">Private Vault Room</option>
                </select>
              </div>
              <InputField label="Purpose of Event" placeholder="e.g. Birthday Celebration, Product Launch" onChange={(e: any) => setEventData({...eventData, purpose: e.target.value})} />
            </div>
            <button 
              disabled={!eventData.name || !eventData.phone || !eventData.purpose}
              onClick={() => setStep(2)}
              className="w-full bg-gold text-charcoal py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all disabled:opacity-20"
            >
              Continue to Preferences
            </button>
          </div>
        ) : (
          <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {eventTypes.map(t => (
                <button 
                  key={t.title}
                  onClick={() => setEventData({...eventData, type: t.title})}
                  className={`p-6 rounded-2xl border transition-all text-left flex flex-col gap-4 ${eventData.type === t.title ? 'bg-gold border-gold text-charcoal' : 'glass border-white/5 hover:border-gold/30'}`}
                >
                  {t.icon}
                  <div>
                    <h4 className="font-serif text-lg mb-1">{t.title}</h4>
                    <p className={`text-[10px] leading-relaxed ${eventData.type === t.title ? 'text-charcoal/60' : 'text-white/40'}`}>{t.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputField label="Event Date" type="date" onChange={(e: any) => setEventData({...eventData, date: e.target.value})} />
              <div className="flex flex-col gap-4">
                <label className="text-[10px] uppercase font-sans tracking-[0.3em] font-semibold text-white/40">Select Slot</label>
                <select 
                  className="w-full bg-white/5 border-b border-gold/30 p-4 text-sm focus:outline-none focus:border-gold transition-all"
                  onChange={(e) => setEventData({...eventData, slot: e.target.value})}
                >
                  <option>Lunch (12:00 PM - 3:00 PM)</option>
                  <option>Evening (4:00 PM - 7:00 PM)</option>
                  <option>Dinner (8:00 PM - 11:00 PM)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="glass px-8 py-5 text-xs font-bold uppercase tracking-widest border border-white/10">Back</button>
              <button 
                disabled={!eventData.type || !eventData.date}
                className="flex-1 bg-gold text-charcoal py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all disabled:opacity-20"
              >
                Confirm Booking Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactScreen() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-32 pb-32 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-20">
      <div className="md:w-1/2">
        <h2 className="font-serif text-6xl md:text-8xl mb-8 leading-[0.9]">Let's Create <br /> Magic.</h2>
        <p className="text-white/50 text-lg leading-relaxed max-w-md mb-12">Whether it's a bespoke dining project or a private inquiry, our team is ready to curate your experience.</p>
        
        <div className="space-y-8">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-gold"><MapPin size={20} /></div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Visit Us</h4>
              <p className="text-sm">74 Heritage Row, Kensington, London</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-gold"><Bell size={20} /></div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Inquiries</h4>
              <p className="text-sm">concierge@ayini.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/2">
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass p-12 rounded-3xl text-center h-full flex flex-col items-center justify-center">
            <Sparkles size={60} className="text-gold mb-8" />
            <h3 className="font-serif text-4xl mb-4">Message Received</h3>
            <p className="text-white/40 mb-8">Our concierge will review your project confirmation and reach out within 24 hours.</p>
            <button onClick={() => setSubmitted(false)} className="text-gold uppercase tracking-[0.3em] text-xs font-bold">Send Another</button>
          </motion.div>
        ) : (
          <form className="glass p-10 md:p-12 rounded-3xl space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <InputField label="Client Name" placeholder="Eleanor Vance" />
            <InputField label="Project Theme / Category" placeholder="Wedding / Corporate / Boutique" />
            <InputField label="Phone" placeholder="+44 20 7946 0000" />
            <div className="flex flex-col gap-4">
              <label className="text-[10px] uppercase font-sans tracking-[0.3em] font-semibold text-white/40">Inquiry Details</label>
              <textarea className="w-full bg-white/5 border-b border-gold/30 p-4 text-sm focus:outline-none focus:border-gold transition-all min-h-[120px] resize-none" placeholder="How can we assist you?" />
            </div>
            <button className="w-full bg-gold text-charcoal py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all">
              Confirm Project Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function StoryScreen() {
  return (
    <div className="pt-32 pb-32 px-6 max-w-4xl mx-auto">
      <div className="relative h-[500px] rounded-3xl overflow-hidden mb-20 shadow-2xl group">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0ezplN98omUY1H_QrXt1ETXLxnsEgM1LhebFctF3U-_F5DutHeYnfEYjDnplCWiG58WtrYR17OfhAUwI99V6iaHdr3olrh2_L85Bdu0ImxUWrThrhNFxNxeeRL0qJiI4VKAr1L42N6ZP0ZtrS-T1zi4NM648UT7mA_RAhcvjtvYlglb44HEWNfQVkq2r0k3QrHglR8LttHfupkgIkKjRcHHS0FSOeopFnJSGoDL27XrspkiSI5qHjpztLrHjQBKBSfNPZE3vy5K7Q" 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" 
          alt="Story" 
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="font-serif text-7xl md:text-9xl text-white mix-blend-overlay">Roots.</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h3 className="font-serif text-4xl mb-8 leading-tight">Preserving Ancient <br /> Alchemy.</h3>
          <p className="text-white/60 leading-relaxed mb-6">Ayini was founded on a simple yet radical premise: that the most sophisticated culinary futures are written in our most ancient culinary pasts.</p>
          <p className="text-white/60 leading-relaxed">Our kitchen serves as a living museum, where techniques from the 12th century are polished with 21st-century precision.</p>
        </div>
        <div className="space-y-12">
          <div className="flex flex-col gap-2">
            <span className="text-gold font-bold font-serif text-3xl">18+</span>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Years of research into heritage spice routes.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gold font-bold font-serif text-3xl">3</span>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Michelin standards of service across all locations.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gold font-bold font-serif text-3xl">100%</span>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Organic ingredients sourced from local artisan farms.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
