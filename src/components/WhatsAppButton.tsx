import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  const whatsappNumber = "+447376618557";
  const message = "Hello! I'm interested in learning more about investment opportunities in East Africa.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-2xl px-6 py-3 h-auto shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 group"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium whitespace-nowrap">
          Chat With Us On WhatsApp
        </span>
      </Button>
    </div>
  );
}