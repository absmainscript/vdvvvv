/**
 * AboutSection.tsx
 * 
 * Seção "Sobre a Psicóloga" do site
 * Apresenta informações profissionais, qualificações e abordagem terapêutica
 * Contém cards com especialidades e animações de entrada suave
 * Utiliza Intersection Observer para ativar animações ao rolar a página
 */

import { motion } from "framer-motion";
import { 
  Brain, 
  Heart, 
  BookOpen, 
  Users, 
  Award, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  CheckCircle,
  Camera,
  Stethoscope, Activity, Zap, Shield, Target,
  UserPlus, UserCheck, UserX, UserCog, Sun, Moon, Sparkles,
  MessageCircle, MessageSquare, Mic, Volume2, TrendingUp, BarChart, PieChart, Gauge,
  Leaf, Flower, TreePine, Wind, Handshake, HelpCircle, LifeBuoy, Umbrella,
  Home, Gamepad2, Puzzle, Palette, Footprints, Waves, Mountain, Compass,
  Timer, Calendar, Hourglass
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { processTextWithGradient, processBadgeWithGradient } from "@/utils/textGradient";
import Avatar from "./Avatar";
import type { Specialty } from "@shared/schema";

export function AboutSection() {
  const { data: configs } = useQuery({
    queryKey: ["/api/admin/config"],
    queryFn: async () => {
      const response = await fetch("/api/admin/config");
      return response.json();
    },
  });

  const { data: specialties = [] } = useQuery({
    queryKey: ["/api/admin/specialties"],
    queryFn: async () => {
      const response = await fetch("/api/admin/specialties");
      return response.json();
    },
  });

  const heroImage = configs?.find((c: any) => c.key === "hero_image");
  const customImage = heroImage?.value?.path || null;

  const generalInfo = configs?.find((c: any) => c.key === "general_info")?.value as any || {};
  // Obtém dados das configurações
  const aboutSection = configs?.find((c: any) => c.key === 'about_section')?.value as any || {};
  const specialtiesSection = configs?.find((c: any) => c.key === 'specialties_section')?.value as any || {};
  const badgeGradient = configs?.find(c => c.key === 'badge_gradient')?.value?.gradient;
  const currentCrp = generalInfo.crp || "08/123456";
  const aboutText = aboutSection.description || "";

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      data-section="about" 
      className="main-section relative overflow-hidden" 
      style={{ margin: 0, padding: 0 }}
      ref={ref}
    >
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
            {/* Card Sobre Mim */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="card-aesthetic p-6 sm:p-8 lg:p-10 h-fit"
            >
              <div className="text-left">
                <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-3 tracking-tight leading-tight">
                  {processTextWithGradient(generalInfo.name || "Dra. (Adrielle Benhossi)", badgeGradient)}
                </h3>
                <p className="text-pink-500 text-sm mb-8 font-medium">
                    {(() => {
                      const professionalTitleInfo = configs?.find((c: any) => c.key === "professional_title")?.value as any || {};
                      return professionalTitleInfo.title || "Psicóloga Clínica";
                    })()} • CRP: {currentCrp}</p>

                <div className="text-gray-600 leading-relaxed mb-8 text-base lg:text-lg">
                  {(aboutText || "Este é o espaço para escrever sobre você no painel administrativo.")
                    .split('\n')
                    .map((paragraph, index) => (
                      <p key={index} className={index > 0 ? "mt-4" : ""}>
                        {paragraph}
                      </p>
                    ))
                  }
                </div>

                {/* Credenciais */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  {(() => {
                    const aboutCredentials = configs?.find((c: any) => c.key === "about_credentials")?.value as any[] || [];
                    const activeCredentials = aboutCredentials
                      .filter(cred => cred.isActive !== false)
                      .sort((a, b) => (a.order || 0) - (b.order || 0));

                    if (activeCredentials.length === 0) {
                      // Fallback para dados padrão se não houver credenciais configuradas
                      return (
                        <>
                          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-2xl border border-pink-100/50">
                            <div className="text-sm font-semibold text-gray-700">Centro Universitário Integrado</div>
                            <div className="text-xs text-gray-500 mt-1">Formação Acadêmica</div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-2xl border border-purple-100/50">
                            <div className="text-sm font-semibold text-gray-700">Terapia Cognitivo-Comportamental</div>
                            <div className="text-xs text-gray-500 mt-1">Abordagem Terapêutica</div>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-2xl border border-green-100/50 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                            <div className="text-sm font-semibold text-gray-700">Mais de 5 anos de experiência</div>
                            <div className="text-xs text-gray-500 mt-1">Experiência Profissional</div>
                          </div>
                        </>
                      );
                    }

                    return activeCredentials.map((credential: any, index: number) => (
                      <div 
                        key={credential.id} 
                        className={`bg-gradient-to-br ${credential.gradient} p-4 rounded-2xl border border-white/20 ${
                          activeCredentials.length === 3 && index === 2 ? 'sm:col-span-2 lg:col-span-1 xl:col-span-2' : ''
                        }`}
                      >
                        <div className="text-sm font-semibold text-gray-700">{credential.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{credential.subtitle}</div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </motion.div>

            {/* Card Especialidades */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="card-aesthetic p-6 sm:p-8 lg:p-10 h-fit"
            >
              <div className="mb-8">
                <h2 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl mb-4">
                  {processTextWithGradient(specialtiesSection.title || "Minhas (especialidades)")}
                </h2>
                <p className="text-gray-500 text-base lg:text-lg leading-relaxed">
                  {specialtiesSection.subtitle || "Áreas especializadas onde posso te ajudar a encontrar equilíbrio e bem-estar emocional"}
                </p>
              </div>

              {/* Specialty Cards - Dinâmicas do banco */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {specialties
                  .filter(specialty => specialty.isActive)
                  .sort((a, b) => a.order - b.order)
                  .map((specialty, index) => {
                    // Mapeamento completo de ícones
                    const iconMap: Record<string, any> = {
                      // Ícones Principais
                      Brain, Heart, BookOpen, Users, Award, Clock, MapPin, Phone, Mail, Star,
                      CheckCircle, Camera,
                      // Ícones de Saúde Mental
                      Stethoscope, Activity, Zap, Shield, Target,
                      // Ícones de Relacionamento
                      UserPlus, UserCheck, UserX, UserCog,
                      // Ícones de Bem-estar
                      Sun, Moon, Sparkles,
                      // Ícones de Comunicação
                      MessageCircle, MessageSquare, Mic, Volume2,
                      // Ícones de Crescimento
                      TrendingUp, BarChart, PieChart, Gauge,
                      // Ícones de Mindfulness
                      Leaf, Flower, TreePine, Wind,
                      // Ícones de Apoio
                      Handshake, HelpCircle, LifeBuoy, Umbrella,
                      // Ícones de Família
                      Home, Gamepad2, Puzzle, Palette,
                      // Ícones de Movimento
                      Footprints, Waves, Mountain, Compass,
                      // Ícones de Tempo
                      Timer, Calendar, Hourglass
                    };

                    const IconComponent = iconMap[specialty.icon] || Brain;

                    // Função para converter cor hex em RGB e depois em tom mais suave
                    const getSoftColor = (hexColor: string) => {
                      const hex = hexColor.replace('#', '');
                      const r = parseInt(hex.substr(0, 2), 16);
                      const g = parseInt(hex.substr(2, 2), 16);
                      const b = parseInt(hex.substr(4, 2), 16);
                      const softR = Math.round(r * 0.15 + 255 * 0.85);
                      const softG = Math.round(g * 0.15 + 255 * 0.85);
                      const softB = Math.round(b * 0.15 + 255 * 0.85);
                      return `rgb(${softR}, ${softG}, ${softB})`;
                    };

                    return (
                      <motion.div
                        key={specialty.id}
                        className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-gray-100/80 hover:bg-white/90 hover:border-gray-200/80 hover:shadow-md transition-all duration-300 cursor-pointer group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex items-start space-x-4">
                          <div 
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                            style={{ backgroundColor: getSoftColor(specialty.iconColor) }}
                          >
                            <IconComponent 
                              className="w-5 h-5" 
                              style={{ color: specialty.iconColor }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 mb-2 text-base group-hover:text-gray-900 transition-colors duration-200">
                              {specialty.title}
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                              {specialty.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;