module.exports = function(app) {

  if (app.get("seed")) {
    const channels = app.service("channels")

    // Data to create some entries in the database

    const channelsData = [
      { name: "Puppies" },
      { name: "Metal war" },
      { name: "House of Cards" }
    ]

    console.log("Seeding database...")

    // Remove all data
    Promise.all([
      channels.remove(null)
  ]).then(() => {
      console.log(" - Seed: cleanup database")

      // Create users
      channelsData.forEach(channel => channels.create(channel))
  })
  }
}
