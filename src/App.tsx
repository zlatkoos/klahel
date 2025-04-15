import emailjs from '@emailjs/browser';
import { useRef } from 'react';

import {
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle2,
  Star,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react';


function App() {
  const formRef = useRef<HTMLFormElement>(null);

const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formRef.current) return;

    emailjs
    .sendForm(
      'service_jzttqdu',
      'template_l002sjb',
      formRef.current,
      '3Eonr5JTFYRYAIJuW'
    )
    .then(
      (result) => {
        alert('Poruka je uspješno poslana!' + result.text);
        (formRef.current as HTMLFormElement).reset();
      },
      (error) => {
        alert('Došlo je do pogreške, pokušajte ponovno.');
        console.log(error.text);
      }
    );

};

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-screen">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('/images/slika1.jpg')",
              //"url('https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <nav className="relative z-10 container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-white text-2xl font-bold flex items-center">
              <Sparkles className="mr-2" />
              Klahel
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-white hover:text-blue-200">
                Usluge
              </a>
              <a href="#work" className="text-white hover:text-blue-200">
                Posao
              </a>
              <a href="#process" className="text-white hover:text-blue-200">
                Proces
              </a>
              {/*
              <a
                href="#testimonials"
                className="text-white hover:text-blue-200"
              >
                Preporuke
              </a>
              */}
              <a href="#contact" className="text-white hover:text-blue-200">
                Kontakti
              </a>
            </div>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 h-[calc(100vh-80px)] flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Neka vaš prostor zablista od čistoće
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Stručno i efikasno čišćenje stambenih i poslovnih prostora.
              Dopustite da vam olakšamo svakodnevno čišćenje vašeg doma.
            </p>
            {/*
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center">
              Get Free Quote <ArrowRight className="ml-2" />
            </button>
            */}
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Naše usluge</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Čišćenje domova',
                description: 'Čistimo vaš dom u skladu s vašim potrebama',
                icon: <Sparkles className="w-12 h-12 text-blue-600" />,
              },
              {
                title: 'Čišćenje poslovnih prostora',
                description:
                  'Profesionalno i detaljno čišćenje ureda i poslovnih prostora',
                icon: <Shield className="w-12 h-12 text-blue-600" />,
              },
              {
                title: 'Temeljito čišćenje',
                description:
                  'Namještaj, pod i svaki kutak vašeg doma biti će temeljito očišćen',
                icon: <Zap className="w-12 h-12 text-blue-600" />,
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section id="work" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Pogledajte što sve radimo za vas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-lg">
              <img
                src="images/slika2.jpg"
                //"https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80"
                alt="Čišćenje kuhinje"
                className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">
                    Čišćenje kuhinje
                  </h3>
                  <p className="text-gray-200">
                    Naša čarobna pasta uklanja sva zaprljanja
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg">
              <img
                src="images/slika3.jpg"
                //"https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80"
                alt="Office Cleaning"
                className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">
                    Čišćenje ureda
                  </h3>
                  <p className="text-gray-200">
                    Dezinfekcija i čićenje uredskog namještaja
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg">
              <img
                src="images/slika4.jpg"
                //"https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80"
                alt="Bathroom Cleaning"
                className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">
                    Čišćenje kupatila
                  </h3>
                  <p className="text-gray-200">
                    Uklanjanje kamenca i svih zaprljanja
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Naš proces čišćenja
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: 'Dogovor',
                description:
                  'Uključuje razgledavanje vašeg prostora i sastavljanje ponude',
                icon: <CheckCircle2 className="w-12 h-12 text-blue-600" />,
              },
              {
                title: 'Izlazak na teren',
                description:
                  'Prema prethodno dogovorenom terminu dolazimo obaviti personalizirano čišćenje',
                icon: <Shield className="w-12 h-12 text-blue-600" />,
              },
              {
                title: 'Obavljanje zadataka',
                description:
                  'Temeljito i profesionalno ostvarujemo vaše zahtjeve',
                icon: <Zap className="w-12 h-12 text-blue-600" />,
              },
              {
                title: 'Nadzor obavljenog',
                description:
                  'Zajedno s vama provjeravamo zadovoljstvo uslugom',
                icon: <Star className="w-12 h-12 text-blue-600" />,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Ovaj dio ostaviti kada bude pohvala od klijenata*/}
      {/* Testimonials */}
      {/*
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Preporuke zadovoljnih klijenata
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                text: "The best cleaning service I've ever used. They transformed my home completely!",
                rating: 5,
              },
              {
                name: 'Michael Brown',
                text: 'Exceptional attention to detail. Our office has never looked better.',
                rating: 5,
              },
              {
                name: 'Emily Davis',
                text: 'Professional, reliable, and thorough. Highly recommended!',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-600">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Kontakt podatci
              </h2>
              <p className="text-blue-100 mb-8">
                Trebate temeljito čišćenje ili pak redovno održavanje čistoće vašeg prostora? Slobodno nas kontaktirajte
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-white">
                  <PhoneCall className="w-6 h-6 mr-3" />
                  <span>(091) 932-1421</span>
                </div>
                <div className="flex items-center text-white">
                  <Mail className="w-6 h-6 mr-3" />
                  <span>klahel@klahel.hr</span>
                </div>
                <div className="flex items-center text-white">
                  <MapPin className="w-6 h-6 mr-3" />
                  <span>Drinska 10A, 31000 Osijek</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Ime i prezime ili naziv vaše tvrtke
    </label>
    <input
      type="text"
      name="user_name"
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      placeholder="Vaše ime ili naziv vaše tvrtke"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Broj telefona
    </label>
    <input
      type="tel"
      name="user_number"
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      placeholder="Vaš broj telefona"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      E-mail adresa
    </label>
    <input
      type="email"
      name="user_email"
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      placeholder="Vaš email"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Poruka
    </label>
    <textarea
      name="user_message"
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      rows={4}
      placeholder="Vaša poruka"
      required
    ></textarea>
  </div>
  <button
    type="submit"
    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
  >
    Pošalji
  </button>
</form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Sparkles className="mr-2" />
              <span className="text-xl font-bold">KLAHEL</span>
            </div>
            <div className="text-center md:text-right">
              <p>© 2025 KLAHEL. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
