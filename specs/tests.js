describe('chai support should style assert', function () {
    it('should fail when asserting false', function () {
        false.should.equal(false)
    })

    it('should pass when testing type', function () {
        "string".should.be.a("string")
    })

    it('should pass when testing include', function () {
        [1, 2, 3].should.include(2)
    })
});


var foo = {
    do: function(thing){ return "no"}
};

//filtering
//
// mocha -g 'sinon'
// describe.only('sinon', ...);
// it.only('sinon', ...);
//
//if you have two only , the last 'only' will be run

describe('sinon', function(){
    //it.only('should stub a method', function(){
    //use skip to bypass this test only
    //it.skip('should stub a method', function(){
    it('should stub a method', function(){
        foo.do("thing").should.equal("no")

        sinon.stub(foo, "do", function(){return "yes"})
        foo.do("thing").should.equal("yes")

        foo.do.restore()
        foo.do("thing").should.equal("no")
    });

    it('should validate if a function is called', function(){
        sinon.stub(foo, "do", function(){return "yes"})

        foo.do.calledOnce.should.be.false

        foo.do("thing").should.equal("yes")
        foo.do.calledOnce.should.be.true

        foo.do.restore()
    });

    it('should validate a functions parameters', function(){
        sinon.stub(foo, "do", function(thing){
            thing.should.equal("thing")
            return "yes"
        })

        foo.do("thing").should.equal("yes")
        foo.do.calledOnce.should.be.true

        foo.do.restore()
    });
});
