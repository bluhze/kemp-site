'use client'

export function NewsletterForm() {
  return (
    <div className="bg-zinc-50 p-8 text-center border border-zinc-100 mt-4">
      <h5 className="font-display font-normal text-xl mb-2 tracking-wide uppercase">Want More Tea?</h5>
      <p className="text-sm text-zinc-500 mb-6">Sign up for the Kempire Newsletter to get daily pop culture updates.</p>
      <form className="flex" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Your email address"
          className="flex-grow px-4 py-3 bg-white border border-zinc-200 text-sm focus:outline-none focus:border-kempire-gold"
        />
        <button
          type="submit"
          className="bg-kempire-dark text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-kempire-gold transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}
