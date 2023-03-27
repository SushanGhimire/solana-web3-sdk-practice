import { Button, Card, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import idl from "../../utils/idl.json";
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { ANCHOR_PROGRAM_ID, ANCHOR_CONNECTION } from "../constants";
import { PublicKey } from "@solana/web3.js";

type Props = {};

const MovieReview = (props: Props) => {
  const walletObj = useWallet();
  const [program, setProgram] = useState<anchor.Program>();
  const connection = ANCHOR_CONNECTION;
  const wallet = useAnchorWallet();
  const movieProgramId = new anchor.web3.PublicKey(ANCHOR_PROGRAM_ID);
  const [review, setReview] = useState<{
    title: string;
    rating: number;
    comment: string;
    reviewer: PublicKey;
  } | null>(null);

  const [movieData, setMovieData] = useState<{
    title: string;
    rating: number;
    comment: string;
  }>({
    title: "",
    rating: 0,
    comment: "",
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  const getMoviePda = () => {
    if (wallet) {
      const [pda] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("movie"), wallet?.publicKey.toBuffer()],
        movieProgramId
      );
      return pda.toString() ?? "";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (review) {
      updateReview();
    } else {
      const moviePda = getMoviePda();
      const signature = await program?.methods
        .addMovieReview(
          movieData.title,
          movieData.comment,
          parseInt(movieData.rating.toString())
        )
        .accounts({
          movieState: new PublicKey(moviePda),
          reviewer: walletObj.publicKey ?? new PublicKey(""),
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      if (signature) {
        fetchAllReviews();
        console.log(signature);
      }
    }
  };
  const updateReview = async () => {
    const moviePda = getMoviePda();
    const formData = {
      title: "Ad voluptas fugit u",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, nostrum dolorum velit accusamus voluptatum magni deleniti quis, ipsam provident reiciendis ullam neque, est optio dolor eaque ratione sunt vel nam.",
      rating: 5,
    };
    const signature = await program?.methods
      .updateMovieReview(
        formData.title,
        formData.comment,
        parseInt(formData.rating.toString())
      )
      .accounts({
        movieState: new PublicKey(moviePda),
        reviewer: walletObj.publicKey ?? new PublicKey(""),
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    if (signature) {
      fetchAllReviews();
      console.log(signature);
    }
  };

  const deleteReview = async () => {
    const moviePda = getMoviePda();
    const signature = await program?.methods
      .deleteReview(review?.title)
      .accounts({
        movieState: new PublicKey(moviePda),
        reviewer: walletObj.publicKey ?? new PublicKey(""),
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    if (signature) {
      fetchAllReviews();
      console.log(signature);
    }
  };
  useEffect(() => {
    if (wallet) {
      let provider: anchor.Provider;

      try {
        provider = anchor.getProvider();
      } catch {
        provider = new anchor.AnchorProvider(connection, wallet, {});
        anchor.setProvider(provider);
      }

      const program = new anchor.Program(idl as anchor.Idl, ANCHOR_PROGRAM_ID);
      setProgram(program);
    }
    //eslint-disable-next-line
  }, [wallet]);

  const fetchAllReviews = async () => {
    // const accounts = await connection
    //   .getProgramAccounts(new anchor.web3.PublicKey(ANCHOR_PROGRAM_ID))
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const pda = getMoviePda();
    const review = await connection.getAccountInfo(new PublicKey(pda));
    // console.log(review?.data);
    if (review?.data) {
      const reviews = await program?.coder.accounts.decode(
        "MovieState",
        review?.data
      );
      setReview(reviews);
      setMovieData({
        ...movieData,
        title: reviews.title,
        comment: reviews.comment,
        rating: reviews.rating,
      });
    } else {
      setReview(null);
      setMovieData({
        ...movieData,
        title: "",
        comment: "",
        rating: 0,
      });
    }
  };
  console.log(review);

  useEffect(() => {
    if (program) {
      fetchAllReviews();
    }
    //eslint-disable-next-line
  }, [program]);

  return (
    <div className="flex gap-10">
      <div className="flex-1">
        <h1>@project-serum/anchor</h1>
        <form
          action=""
          className="bg-wgite shadow-lg p-10"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-2xl font-bold">Movie Reviews</h1>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Movie Title" />
            </div>
            <TextInput
              id="title"
              type="text"
              required={true}
              sizing="md"
              value={movieData.title}
              name="title"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleOnChange(e);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Movie Comment" />
            </div>
            <TextInput
              id="comment"
              type="text"
              required={true}
              sizing="md"
              value={movieData.comment}
              name="comment"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleOnChange(e);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="rating" value="Movie Rating" />
            </div>
            <TextInput
              id="rating"
              type="number"
              required={true}
              sizing="md"
              value={movieData.rating}
              name="rating"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleOnChange(e);
              }}
            />
          </div>
          <Button className="my-5 w-full" type="submit">
            {review ? "Update" : "Submit"}
          </Button>
        </form>
      </div>
      {/* movie list  */}
      <div className="flex-1">
        <Card>
          <h1 className="text-2xl font-semibold text-gray-900">
            {review?.title}
          </h1>
          <p className="text-gray-500">{review?.comment}</p>
          <div className="font-medium text-sm text-gray-500">
            Reviewed By: {review?.reviewer.toBase58()}
          </div>
          <div className="flex items-center gap-4">
            <Button color="failure" onClick={deleteReview}>
              Delete
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MovieReview;
