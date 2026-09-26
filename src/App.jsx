import { useState } from 'react'
import './App.css'

const cars = [
	{
		id: 1,
		name: 'Porsche 911 Carrera',
		year: 2024,
		type: 'Coupe',
		make: 'Porsche',
		price: 128900,
		mileage: '2,410 mi',
		image:
			'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=85',
		badge: 'JUST ARRIVED',
	},
	{
		id: 2,
		name: 'Mercedes-Benz G-Class',
		year: 2023,
		type: 'SUV',
		make: 'Mercedes-Benz',
		price: 142500,
		mileage: '8,205 mi',
		image:
			'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1100&q=85',
		badge: 'LOW MILEAGE',
	},
	{
		id: 3,
		name: 'BMW M4 Competition',
		year: 2024,
		type: 'Coupe',
		make: 'BMW',
		price: 87900,
		mileage: '1,180 mi',
		image:
			'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1100&q=85',
		badge: 'CERTIFIED',
	},
]

function App() {
	const [filters, setFilters] = useState({ make: 'Any make', type: 'Any style', budget: 'No max' })
	const [appliedFilters, setAppliedFilters] = useState(filters)
	const [savedCars, setSavedCars] = useState([])

	const visibleCars = cars.filter((car) => {
		const matchesMake = appliedFilters.make === 'Any make' || car.make === appliedFilters.make
		const matchesType = appliedFilters.type === 'Any style' || car.type === appliedFilters.type
		const matchesBudget =
			appliedFilters.budget === 'No max' || car.price <= Number(appliedFilters.budget)

		return matchesMake && matchesType && matchesBudget
	})

	function handleSearch(event) {
		event.preventDefault()
		setAppliedFilters(filters)
		document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })
	}

	function toggleSaved(id) {
		setSavedCars((current) =>
			current.includes(id) ? current.filter((carId) => carId !== id) : [...current, id],
		)
	}

	return (
		<main>
			<div className="announcement">
				<span>THE GOOD DRIVE STARTS HERE</span>
				<span>Thoughtfully sourced. Ready for the road.</span>
				<a href="#inventory">Explore the collection <span aria-hidden="true">↗</span></a>
			</div>

			<header className="site-header">
				<a className="wordmark" href="#top" aria-label="Morrow home">
					morrow<span>.</span>
				</a>
				<nav className="main-nav" aria-label="Main navigation">
					<a className="active" href="#inventory">Shop cars</a>
					<a href="#how-it-works">Our approach</a>
					<a href="#journal">The journal</a>
				</nav>
				<div className="header-actions">
					<a className="saved-link" href="#inventory">Saved <span>{savedCars.length}</span></a>
					<a className="sign-in" href="mailto:hello@morrow.cars">Talk to a person <span aria-hidden="true">↗</span></a>
				</div>
			</header>

			<section className="hero" id="top" aria-labelledby="hero-title">
				<img
					className="hero-image"
					src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=90"
					alt="A dark sports car on an open road"
				/>
				<div className="hero-shade" />
				<div className="hero-content">
					<p className="eyebrow"><span className="eyebrow-line" /> GOOD CARS, GOOD PEOPLE</p>
					<h1 id="hero-title">Your next car<br />has a good story.</h1>
					<p className="hero-copy">A more considered way to find the one you’ll love driving.</p>
					<a className="hero-cta" href="#inventory">Find your car <span aria-hidden="true">↗</span></a>
				</div>
				<div className="hero-caption"><span>01 / 03</span><span>THE OPEN ROAD, YOURS TO TAKE</span></div>
				<div className="hero-side-note">A little less looking. A lot more living.</div>
			</section>

			<section className="search-section" aria-label="Find your car">
				<form className="search-form" onSubmit={handleSearch}>
					<div className="search-intro">
						<span className="search-kicker">START SOMEWHERE</span>
						<strong>Find your kind of car</strong>
					</div>
					<label className="filter-field">
						<span>MAKE</span>
						<select value={filters.make} onChange={(event) => setFilters({ ...filters, make: event.target.value })}>
							<option>Any make</option>
							<option>BMW</option>
							<option>Mercedes-Benz</option>
							<option>Porsche</option>
						</select>
					</label>
					<label className="filter-field">
						<span>BODY STYLE</span>
						<select value={filters.type} onChange={(event) => setFilters({ ...filters, type: event.target.value })}>
							<option>Any style</option>
							<option>Coupe</option>
							<option>SUV</option>
						</select>
					</label>
					<label className="filter-field">
						<span>MAX BUDGET</span>
						<select value={filters.budget} onChange={(event) => setFilters({ ...filters, budget: event.target.value })}>
							<option value="No max">No max</option>
							<option value="90000">$90,000</option>
							<option value="130000">$130,000</option>
							<option value="150000">$150,000</option>
						</select>
					</label>
					<button className="search-button" type="submit">See {visibleCars.length || 'all'} cars <span aria-hidden="true">↗</span></button>
				</form>
			</section>

			<section className="inventory-section" id="inventory">
				<div className="section-heading">
					<div>
						<p className="eyebrow dark-eyebrow">THE MORROW EDIT</p>
						<h2>A few worth a closer look.</h2>
					</div>
					<a className="text-link" href="mailto:hello@morrow.cars">See the whole collection <span aria-hidden="true">↗</span></a>
				</div>

				{visibleCars.length ? (
					<div className="car-grid">
						{visibleCars.map((car) => (
							<article className="car-card" key={car.id}>
								<div className="car-image-wrap">
									<img src={car.image} alt={car.name} />
									<span className="car-badge">{car.badge}</span>
									<button
										className={`save-button${savedCars.includes(car.id) ? ' is-saved' : ''}`}
										type="button"
										aria-label={`${savedCars.includes(car.id) ? 'Remove' : 'Save'} ${car.name}`}
										aria-pressed={savedCars.includes(car.id)}
										onClick={() => toggleSaved(car.id)}
									>
										{savedCars.includes(car.id) ? 'Saved' : 'Save'}
									</button>
								</div>
								<div className="car-details">
									<div className="car-title-row">
										<div><span className="car-year">{car.year} · {car.type}</span><h3>{car.name}</h3></div>
										<span className="car-arrow" aria-hidden="true">↗</span>
									</div>
									<div className="car-meta"><span>{car.mileage}</span><span>·</span><span>Single owner</span></div>
									<div className="car-price-row"><strong>${car.price.toLocaleString()}</strong><span>EST. FROM ${Math.round(car.price / 60).toLocaleString()} / MO</span></div>
								</div>
							</article>
						))}
					</div>
				) : (
					<div className="empty-state">No cars match those filters. Try another combination.</div>
				)}
			</section>

			<section className="promise-strip" id="how-it-works">
				<span className="promise-mark">m.</span>
				<p>Good cars, without the guesswork.</p>
				<span>Every car is checked, every detail is clear, and real people are here when you need them.</span>
				<a href="mailto:hello@morrow.cars">Get to know us <span aria-hidden="true">↗</span></a>
			</section>

			<footer className="site-footer" id="journal">
				<a className="wordmark" href="#top">morrow<span>.</span></a>
				<span>MAKE ROOM FOR THE GOOD STUFF.</span>
				<span>© 2026 MORROW MOTORS</span>
			</footer>
		</main>
	)
}

export default App
