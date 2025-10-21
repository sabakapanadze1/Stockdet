const mongoose = require("mongoose");

// Test database connection
async function testDatabaseConnection() {
  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/stockdet";

  console.log("🔍 Testing database connection...");
  console.log(
    "📍 Connection URI:",
    MONGODB_URI.replace(/\/\/.*@/, "//***:***@")
  ); // Hide credentials

  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });

    console.log("✅ Database connection successful!");
    console.log("📊 Database name:", mongoose.connection.db.databaseName);
    console.log(
      "🔗 Connection state:",
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
    );

    // Test a simple operation
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "📁 Available collections:",
      collections.length > 0
        ? collections.map((c) => c.name)
        : "No collections found"
    );

    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      test: String,
      timestamp: { type: Date, default: Date.now },
    });

    const TestModel = mongoose.model("ConnectionTest", testSchema);
    const testDoc = new TestModel({ test: "Database connection test" });
    await testDoc.save();
    console.log("✅ Test document created successfully");

    // Clean up test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log("🧹 Test document cleaned up");
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error("Error type:", error.name);
    console.error("Error message:", error.message);

    if (error.name === "MongooseServerSelectionError") {
      console.error("💡 This usually means:");
      console.error("   - MongoDB server is not running");
      console.error("   - Wrong connection string");
      console.error("   - Network connectivity issues");
    }

    process.exit(1);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
}

// Run the test
testDatabaseConnection();
