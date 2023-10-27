import PageNotFoundError from "../errors/Page-not-found.js";
import UnauthorizedError from "../errors/Unauthorized.js";
import Listing from "../models/listing.model.js";

export const createListing = async (req, res) => {
  const listing = await Listing.create(req.body);
  return res.status(201).json(listing);
};

export const deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new PageNotFoundError("Listing not found");

  if (req.user.id !== listing.userRef)
    throw new UnauthorizedError("You can only delete your own listing");

  await Listing.findByIdAndDelete(req.params.id);
  return res.status(201).json("Delete successfully");
};

export const updateListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) throw new PageNotFoundError("Listing not found");
  if (req.user.id !== listing.userRef)
    throw new UnauthorizedError("You can only update your own listing");

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedListing);
};

export const getListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new PageNotFoundError("Listing not found");
  res.status(200).json(listing);
};

export const getListings = async (req, res) => {
  const limit = parseInt(req.query.limit) || 9
  const startIndex = parseInt(req.query.startIndex) || 0
  let offer = req.query.offer

  if (offer === undefined || offer === false) {
    offer = { $in: [false, true] }
  }

  let furnished = req.query.furnished

  if(furnished === undefined || furnished === false) {
    furnished = { $in: [false, true] }
  }

  let parking = req.query.parking

  if(parking === undefined || parking === false) {
    parking = { $in: [false, true] }
  }

  let type = req.query.type

  if(type === undefined || type === 'all') {
    type = { $in: ['sale', 'rent'] }
  }

  let searchTerm = req.query.searchTerm || ''

  const sort = req.query.sort || 'createdAt'

  const order = req.query.order || 'desc'

  const listings = await Listing.find({
    name: { $regex: searchTerm, $options: 'i' },
    offer,
    furnished,
    parking,
    type,
  }).sort({ [sort]: order }).limit(limit).skip(startIndex)

  return res.status(200).json(listings);
}