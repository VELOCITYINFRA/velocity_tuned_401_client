"use client";
import { useState, useEffect } from 'react';
import { detectWallets ,getGeolocationData,VelocityAuth} from "velocitytunedx401"


function App() {
    
    const [wallets, setWallets] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const [location, setLocation] = useState({ latitude: null, longitude: null, error: null});


    useEffect(() => {
    async function fetchLocation() {
        const locationdata = await getGeolocationData(); 
    
        setLocation({
            latitude: locationdata.latitude || null, 
            longitude: locationdata.longitude || null,
            error: locationdata.error || null,
            });
            console.log(locationdata)
    }
    fetchLocation(); 
    }, []);


    
    useEffect(() => {
       let wallets=detectWallets()
       setWallets(wallets)
    }, []);

      
    const getWalletIcon = (walletName) => {
        const icons = {
            metamask: "",
            phantom: "/plogo.png",
            solflare:"/solflare.svg"
      
        };

    
        return icons[walletName];
    };

    return (
        <div className="items-center justify-center p-20"   style={{  background: '',minHeight: '90vh'}}>

        
        <button
            onClick={() => setShowPopup(true)}
            className="
                    px-10 py-1
                    text-lg font-bold
                    uppercase tracking-widest 
                    rounded-lg 
                    transition duration-300 ease-in-out
                        
                    bg-white/10 backdrop-blur-md 
                    border border-purple-500/50
            
                    text-white 
                    shadow-[0_0_15px_rgba(168,85,247,0.7)] 
                    hover:bg-white/20 hover:border-fuchsia-500/70
                    transform hover:scale-[1.02]
                    "
                >
                Connect Wallet
        </button>
        

        
        {showPopup && (
            
            <div 
                className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-2 backdrop-blur-sm"
                onClick={() => setShowPopup(false)}
            >
                
            <div 
                className="bg-gray-900/95 p-6 rounded-xl shadow-[0_0_40px_rgba(124,58,237,0.9)] w-full max-w-sm border border-purple-700/70"
                onClick={(e) => e.stopPropagation()}
                    >
            <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-white tracking-wide">
                    Connect Wallet 
            </h2>
            <button 
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-white transition duration-200 p-1"
                aria-label="Close"
            >
            </button>
            </div>
                        
                    
            <div className="space-y-3">
            {wallets.map((wallet,index) => (

            <button
        
                key={wallet.address||index}
                onClick={() => VelocityAuth({

                    wallet:wallet,
                    required_mint:"TOKEN CA",
                    mint_amount:"MINT AMOUNT",
                    geo_code:"true | false",
                    geo_code_locs:"SINGLE COUNTRY CODE HERE : US ,UK",
                    coords:{
                        latitude:location.latitude,
                        longitude:location.longitude
                    }
                    }
                )}
                className="
                    flex items-center justify-start gap-3
                    w-full p-3
                    rounded-lg 
                    transition duration-200 
                    bg-gray-800/80 
                    border border-transparent
                    hover:bg-purple-600/30 
                    hover:border-fuchsia-500 
                    shadow-md
                    hover:scale-[1.02]
                "
                >
    
            <img 
                src={getWalletIcon(wallet)} 
                alt={`${wallet.wallet} icon`}
                className="w-8 h-8 rounded-md"
            />
        
        
            <span className="text-lg font-semibold text-white font-mono">
                {wallet=="phantom"?("PHANTOM"):("SOLFLARE")}
            </span>

            </button>
    ))}
            </div>

            {wallets.length === 0 && (
                <p className="text-center text-gray-400 pt-4">
                No wallets detected. Please install a Solana wallet extension (e.g., Phantom or Solflare).</p>
            )}
            </div>
            </div>
            )}
        </div>
    );
}

export default App;
