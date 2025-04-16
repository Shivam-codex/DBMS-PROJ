import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">FarmDirect</h3>
            <p className="text-gray-600">
              Connecting farmers and consumers directly for fresher food and fairer prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-green-600">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/farmers" className="text-gray-600 hover:text-green-600">
                  Farmers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-600">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Farmers */}
          <div>
            <h3 className="font-bold text-lg mb-4">For Farmers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/join-farmer" className="text-gray-600 hover:text-green-600">
                  Join as a Farmer
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-600 hover:text-green-600">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-green-600">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-gray-600">
              <p>23 Farm Lane</p>
              <p>Pune City, Maharashtra 414305</p>
              <p className="mt-2">info@farmdirect.com</p>
              <p>+91 9011967964</p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} FarmDirect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 