function Footer() {
  const isPassed = true;

  // ❌ BAD WAY : ❌

  // if (!isPassed)
  //   return (
  //     <div className="footer">
  //       <p>Course Result:</p>
  //       <p>You have not passed any course</p>
  //     </div>
  //   );

  // return (
  //   <div className="footer">
  //     <p>Course Result:</p>
  //     <p>
  //       You have successfully passed <strong>33%</strong> of your courses.
  //     </p>
  //   </div>
  // );

  return (
    <div className="footer">
      <p>Course Result:</p>
      {isPassed ? (
        <p>
          You have successfully passed <strong>33%</strong> of your courses.
        </p>
      ) : (
        <p>You have not passed any course</p>
      )}
    </div>
  );
}

export default Footer;
